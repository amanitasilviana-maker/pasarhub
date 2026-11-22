require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { Server } = require('socket.io');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ==========================================
// 1. API PRODUK & KATALOG (DARI SUPABASE)
// ==========================================
app.get('/api/v1/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: { stall: true },
            orderBy: { name: 'asc' }
        });
        // Format agar langsung cocok dengan tampilan React
        const formatted = products.map((p) => ({
            id: p.id,
            nama: p.name,
            harga: Number(p.price),
            satuan: p.unit,
            stok: p.stock,
            kategori: p.category,
            pedagang: p.stall.stall_name,
            stall_id: p.stall_id,
            gambar: p.image_url || '🥬'
        }));
        res.json(formatted);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Tambah produk baru dari Portal Pedagang (/umkm)
app.post('/api/v1/products', async (req, res) => {
    try {
        const { nama, harga, kategori, pedagang, satuan = 'pack', stok = 20 } = req.body;
        const stall = await prisma.merchantStall.findFirst({
            where: { stall_name: { contains: pedagang } }
        });
        if (!stall) return res.status(404).json({ error: 'Lapak tidak ditemukan di database' });

        const newProd = await prisma.product.create({
            data: {
                stall_id: stall.id,
                category: kategori || 'Umum',
                name: nama,
                price: Number(harga),
                unit: satuan,
                stock: Number(stok)
            },
            include: { stall: true }
        });

        io.emit('data:updated');
        res.status(201).json({
            id: newProd.id,
            nama: newProd.name,
            harga: Number(newProd.price),
            kategori: newProd.category,
            pedagang: newProd.stall.stall_name
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 2. API PESANAN & PEMECAHAN SUB-ORDER
// ==========================================
app.get('/api/v1/orders', async (req, res) => {
    try {
        const orders = await prisma.masterOrder.findMany({
            include: {
                customer: true,
                courier: true,
                sub_orders: {
                    include: {
                        stall: true,
                        items: { include: { product: true } }
                    }
                }
            },
            orderBy: { created_at: 'desc' }
        });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/v1/orders', async (req, res) => {
    try {
        const { items, deliveryMethod, alamat, grandTotal, totalProduk, ongkir } = req.body;
        const market = await prisma.market.findFirst();
        const customer = await prisma.user.findFirst({ where: { role: 'CUSTOMER' } });

        // Kelompokkan item per lapak (Order Splitting)
        const grouped = {};
        for (const item of items) {
            const dbProd = await prisma.product.findFirst({
                where: { name: item.nama },
                include: { stall: true }
            });
            if (!dbProd) continue;

            if (!grouped[dbProd.stall_id]) {
                grouped[dbProd.stall_id] = { subtotal: 0, items: [] };
            }
            grouped[dbProd.stall_id].subtotal += Number(dbProd.price) * item.qty;
            grouped[dbProd.stall_id].items.push({
                product_id: dbProd.id,
                quantity: item.qty,
                price_snapshot: dbProd.price
            });
        }

        const createdOrder = await prisma.masterOrder.create({
            data: {
                customer_id: customer.id,
                market_id: market.id,
                fulfillment_type: deliveryMethod === 'pickup' ? 'PICKUP' : 'DELIVERY',
                delivery_address: alamat || 'Ambil Sendiri di Posko PasarHub',
                total_product_amount: Number(totalProduk),
                delivery_fee: Number(ongkir),
                platform_fee: 0,
                grand_total: Number(grandTotal),
                escrow_status: 'HELD',
                order_status: 'PROCESSING_STALLS',
                sub_orders: {
                    create: Object.keys(grouped).map((stallId) => ({
                        stall_id: stallId,
                        subtotal: grouped[stallId].subtotal,
                        stall_status: 'PREPARING',
                        items: { create: grouped[stallId].items }
                    }))
                }
            },
            include: { sub_orders: { include: { stall: true } } }
        });

        io.emit('data:updated');
        res.status(201).json(createdOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Pedagang mengantar SubOrder ke Hub
app.patch('/api/v1/sub-orders/:id/ready', async (req, res) => {
    try {
        const subOrder = await prisma.subOrder.update({
            where: { id: req.params.id },
            data: { stall_status: 'READY_AT_HUB' }
        });

        // Cek apakah semua SubOrder dalam MasterOrder sudah tiba di Hub
        const allSubs = await prisma.subOrder.findMany({
            where: { master_order_id: subOrder.master_order_id }
        });
        const allReady = allSubs.every((s) => s.stall_status === 'READY_AT_HUB');

        if (allReady) {
            await prisma.masterOrder.update({
                where: { id: subOrder.master_order_id },
                data: { order_status: 'CONSOLIDATING_HUB' }
            });
        }

        io.emit('data:updated');
        res.json({ status: 'success', allReady });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 3. KONSOLIDASI HUB & PENCAIRAN ESCROW
// ==========================================
app.patch('/api/v1/orders/:id/consolidate', async (req, res) => {
    try {
        const courier = await prisma.user.findFirst({ where: { role: 'COURIER' } });
        const updated = await prisma.masterOrder.update({
            where: { id: req.params.id },
            data: {
                order_status: 'OUT_FOR_DELIVERY',
                courier_id: courier ? courier.id : null
            }
        });
        io.emit('data:updated');
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.patch('/api/v1/orders/:id/complete', async (req, res) => {
    try {
        const order = await prisma.masterOrder.update({
            where: { id: req.params.id },
            data: {
                order_status: 'COMPLETED',
                escrow_status: 'RELEASED'
            },
            include: { sub_orders: { include: { stall: true } } }
        });

        // Cairkan dana Escrow 100% ke saldo masing-masing pedagang di Supabase
        for (const sub of order.sub_orders) {
            const updatedUser = await prisma.user.update({
                where: { id: sub.stall.user_id },
                data: { wallet_balance: { increment: sub.subtotal } }
            });

            await prisma.walletLedger.create({
                data: {
                    user_id: sub.stall.user_id,
                    master_order_id: order.id,
                    type: 'CREDIT_SALE',
                    amount: sub.subtotal,
                    balance_after: updatedUser.wallet_balance
                }
            });
        }

        io.emit('data:updated');
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Serve React build jika tersedia
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
}

server.listen(PORT, () => {
    console.log(`Server PasarHub Final (Supabase + Socket.io) aktif di http://localhost:${PORT}`);
});