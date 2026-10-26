const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS engine for legacy support
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// DATABASE PRODUK PASAR LENGKAP
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
    "Lapak Bu Joko (Daging)": 99000,
    "Lapak Pak Slamet (Sayur)": 25000,
    "Lapak Mak Sumi (Bumbu)": 19500,
    "Kios Seafood Cak To": 54000
};

let semuaTransaksi = [];

// API Endpoints for React Frontend
app.get('/api/produk', (req, res) => res.json(produkPasar));
app.get('/api/saldo', (req, res) => res.json(saldoPedagang));
app.get('/api/transaksi', (req, res) => res.json(semuaTransaksi));

// Serve React production build from 'dist' if available
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
}

// Legacy EJS Views
app.get('/legacy', (req, res) => {
    res.render('index', { produk: produkPasar, saldo: saldoPedagang, transaksi: semuaTransaksi });
});

app.get('/dashboard-legacy', (req, res) => {
    res.render('dashboard', { transaksi: semuaTransaksi, saldo: saldoPedagang });
});

// React SPA Fallback
app.get('*', (req, res) => {
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.render('index', { produk: produkPasar, saldo: saldoPedagang, transaksi: semuaTransaksi });
    }
});

app.listen(PORT, () => console.log(`PasarHub Server berjalan di port ${PORT}`));
