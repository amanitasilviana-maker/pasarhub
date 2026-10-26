const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DATABASE DENGAN PILIHAN LENGKAP & LINK FOTO CADANGAN
let produkPasar = [
    { id: 101, nama: "Daging Sapi Has Dalam (500g)", harga: 65000, pedagang: "Lapak Bu Joko (Daging)" },
    { id: 102, nama: "Ayam Potong Segar (1 Ekor)", harga: 34000, pedagang: "Lapak Bu Joko (Daging)" },
    { id: 103, nama: "Sayur Bayam Hidroponik Ikat", harga: 5000, pedagang: "Lapak Pak Slamet (Sayur)" },
    { id: 104, nama: "Wortel Lokal Manis (500g)", harga: 8000, pedagang: "Lapak Pak Slamet (Sayur)" },
    { id: 105, nama: "Cabai Rawit Merah Pedas (100g)", harga: 12000, pedagang: "Lapak Pak Slamet (Sayur)" },
    { id: 106, nama: "Bumbu Racik Rendang Instan", harga: 4500, pedagang: "Lapak Mak Sumi (Bumbu)" },
    { id: 107, nama: "Bawang Merah Brebes Besar (250g)", harga: 15000, pedagang: "Lapak Mak Sumi (Bumbu)" },
    { id: 108, nama: "Cumi Asin Kering Premium (200g)", harga: 22000, pedagang: "Kios Seafood Cak To" },
    { id: 109, nama: "Ikan Nila Segar Hidup (1kg)", harga: 32000, pedagang: "Kios Seafood Cak To" }
];

let saldoPedagang = {
    "Lapak Bu Joko (Daging)": 0,
    "Lapak Pak Slamet (Sayur)": 0,
    "Lapak Mak Sumi (Bumbu)": 0,
    "Kios Seafood Cak To": 0
};

let semuaTransaksi = [];

app.get('/', (req, res) => {
    res.render('index', { produk: produkPasar, saldo: saldoPedagang, transaksi: semuaTransaksi });
});

// PERBAIKAN UTAMA: BACKEND SEKARANG MENERIMA VARIABEL METODE PEMBAYARAN BARU ALA GOJEK
app.post('/checkout', (req, res) => {
    const { itemDipilih, metodeBayar } = req.body;
    
    // Jika tidak ada barang yang dicentang, kembalikan ke halaman utama agar tidak crash
    if (!itemDipilih) return res.redirect('/');

    const daftarId = Array.isArray(itemDipilih) ? itemDipilih.map(Number) : [Number(itemDipilih)];
    let itemKeranjang = produkPasar.filter(p => daftarId.includes(p.id));

    if (itemKeranjang.length === 0) return res.redirect('/');

    let totalBarang = itemKeranjang.reduce((sum, item) => sum + item.harga, 0);
    let ongkirFlat = 5000;
    let totalBayar = totalBarang + ongkirFlat;

    let subOrders = {};
    itemKeranjang.forEach(item => {
        if (!subOrders[item.pedagang]) {
            subOrders[item.pedagang] = { pedagang: item.pedagang, items: [], totalSub: 0 };
        }
        subOrders[item.pedagang].items.push(item.nama);
        subOrders[item.pedagang].totalSub += item.harga;
    });

    let idTransaksiInduk = "TXH-" + Date.now();
    
    // Menyimpan informasi jenis metode pembayaran yang dipilih konsumen
    let transaksiBaru = {
        idInduk: idTransaksiInduk,
        totalBayar: totalBayar,
        subOrders: Object.values(subOrders),
        metodeBayar: metodeBayar || "GoPay", 
        status: "Tertahan di Escrow (Hub)"
    };

    semuaTransaksi.push(transaksiBaru);
    res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard', { transaksi: semuaTransaksi, saldo: saldoPedagang });
});

app.post('/konfirmasi-terima/:idInduk', (req, res) => {
    const { idInduk } = req.params;
    let trx = semuaTransaksi.find(t => t.idInduk === idInduk);

    if (trx && trx.status !== "Dana Dicairkan ke Pedagang 100%") {
        trx.status = "Dana Dicairkan ke Pedagang 100%";
        trx.subOrders.forEach(sub => {
            saldoPedagang[sub.pedagang] += sub.totalSub;
        });
    }
    res.redirect('/dashboard');
});

app.listen(PORT, () => console.log(`PasarHub Server berjalan di port ${PORT}`));
