# PasarHub: Platform Marketplace Konsolidasi Pasar Tradisional Otonom

PasarHub adalah platform marketplace independen (SaaS) berbasis **React.js** yang dirancang khusus untuk mendigitalisasi pasar tradisional secara otonom oleh paguyuban atau koperasi lokal. 

Sistem ini menghilangkan potongan komisi besar pihak ketiga (**0% komisi untuk mitra pedagang**), mengefisienkan rantai pasok melalui sistem konsolidasi **Hub-and-Spoke**, serta memberdayakan armada kurir internal lokal pasar.

---

## 🚀 Fitur Utama Sesuai PRD

### 1. 🛒 Persona Konsumen (End-User)
- **Katalog Terpadu & Pencarian Hiperlokal:** Filter kategori (*Sayur, Daging & Unggas, Bumbu & Rempah, Seafood, Tahu & Tempe, Buah*), live search, dan label kesegaran harian.
- **Keranjang Bersama (Cross-Merchant Cart):** Memungkinkan pembeli menggabungkan pesanan dari berbagai lapak pedagang yang berbeda ke dalam satu transaksi dengan **satu ongkir flat (Rp 5.000)**.
- **Metode Pengiriman:** Opsi *Antar ke Alamat via Kurir Hub* atau *Pick-Up Mandiri di Meja Konsolidasi Hub Pasar*.
- **Gateway Pembayaran QRIS & E-Wallet:** Integrasi pembayaran digital QRIS (BCA, Mandiri, GoPay, ShopeePay, Dana) dengan generator kode QR interaktif.
- **Jaminan Smart Escrow (Rekening Bersama):** Dana konsumen dikunci aman di Escrow PasarHub dan **hanya dicairkan 100% utuh ke dompet pedagang setelah konsumen menekan tombol "Konfirmasi Pesanan Diterima"**.
- **Pelacakan Pesanan Real-Time:** Timeline visual 5 tahap perjalanan pesanan beserta penghitung SLA (<90 menit).

### 2. 🏪 Persona Pedagang (Mitra UMKM)
- **Antarmuka Ramah Literasi Digital Rendah-Menengah:** Desain kartu bersih, kontras tinggi, tombol besar, dan alur kerja terarah.
- **Simulasi Notifikasi Suara Nyaring:** Fitur bel alert pesanan masuk khusus untuk kondisi riuh pasar tradisional.
- **Pemisahan Pesanan Otomatis (Order Splitting):** Pedagang hanya melihat item pesanan yang menjadi hak dan tanggung jawab lapaknya.
- **Serah Terima ke Hub Pasar:** Tombol konfirmasi satu klik ketika barang telah selesai dibungkus dan diantar ke Meja Konsolidasi Gate 2.
- **Dompet Digital UMKM (Potongan 0% Komisi):** Tampilan saldo penjualan bersih tanpa potongan sepeser pun dengan fitur pencairan instan.

### 3. 🛵 Persona Kurir Lokal
- **Titik Kumpul Tunggal (Hub Logistik):** Titik ambil terpusat di *Meja Konsolidasi Gate 2, Pasar Sentral* sehingga kurir tidak perlu berkeliling ke tiap-tiap lapak pedagang.
- **Peta Rute Hiperlokal (Routing Simulation):** Visualisasi rute dari Hub Pasar ke alamat pemesan (radius operasional 1.8 km).
- **Manajemen Pengantaran & Komunikasi Konsumen:** Tombol langsung terhubung ke WhatsApp konsumen serta pembaruan status pengantaran langsung.

### 4. 🏛️ Persona Admin Pasar (Hub Admin)
- **Stasiun Konsolidasi Hub (Hub Consolidation Station):** Checklist verifikasi kelengkapan barang antar-lapak (misal: *Lapak Bu Joko [✓], Lapak Pak Slamet [✓], Lapak Mak Sumi [✓]*). Setelah lengkap, sistem memfasilitasi penyatuan paket dan penugasan armada kurir.
- **Dasbor Analitik & Arus Kas Escrow:**
  - *Metrik Sukses PRD:* Volume transaksi harian (>500/hari), tingkat adopsi QRIS (>80%), dan rata-rata SLA pengiriman (<90 menit).
  - *Buku Besar Escrow:* Transparansi dana tertahan (*holding*) vs dana yang telah disalurkan utuh 100% ke pedagang.
- **Resolusi Sengketa (Dispute Management):** Penengah kendala barang rusak/cacat dengan jaminan proteksi ganda.

### 5. 🌐 Struktur Rute Halaman Mandiri & Halaman Login per Persona
Setiap persona memiliki halaman portal utama dan halaman login khusus:

#### Halaman Portal:
- `http://localhost:5173/` : **Halaman Konsumen** (Katalog, Keranjang & Checkout)
- `http://localhost:5173/umkm` : **Halaman Mitra UMKM** (Manajemen Lapak, Pesanan Masuk, Tambah Dagangan)
- `http://localhost:5173/driver` : **Halaman Kurir Lokal** (Titik Kumpul Hub & Rute Pengantaran)
- `http://localhost:5173/admin` : **Halaman Admin Hub** (Stasiun Konsolidasi Barang & Ledger Escrow)

#### Halaman Login Khusus (Wajib Login untuk Fitur Lanjutan):
- `http://localhost:5173/login-user` : **Login Konsumen** (Diwajibkan sebelum melakukan checkout/membeli)
- `http://localhost:5173/login-umkm` : **Login Mitra UMKM** (Diwajibkan untuk menambah dagangan baru & serah terima ke Hub)
- `http://localhost:5173/login-driver` : **Login Driver Kurir** (Diwajibkan untuk mengambil paket & menjalankan antar)
- `http://localhost:5173/login-admin` : **Login Admin Hub** (Diwajibkan untuk memverifikasi konsolidasi & alokasi kurir)

*Tersedia tombol **"Login / Masuk Akun"** di pojok kanan atas masing-masing Navbar persona, serta fitur **1-Klik Demo Login** di setiap halaman login.*

---

## 🛠️ Arsitektur & Teknologi

- **Frontend:** React.js 19, Vite 8, Vanilla CSS Design System, Lucide React Icons, Canvas Confetti
- **Backend / Server:** Express.js, Node.js (melayani SPA build dan endpoint REST API)
- **State Management:** Reactive Component State dengan shared mock database yang sinkron di seluruh 4 persona

---

## 💻 Cara Menjalankan Proyek

### Mode Pengembangan (React + Vite - Direkomendasikan)
```bash
npm run dev
```
Akses di browser pada: **http://localhost:5173/**

### Mode Produksi (Express Server)
```bash
npm run build
npm start
```
Akses di browser pada: **http://localhost:3000/**

---

## 🎯 Panduan Simulasi Alur PRD (Happy Path 8 Langkah)

1. **Langkah 1:** Buka tab **1. Konsumen**, cari dan tambahkan produk dari Lapak Bu Joko, Pak Slamet, dan Mak Sumi ke keranjang.
2. **Langkah 2:** Klik **Lihat Keranjang**, periksa pemecahan lapak dan ongkir flat Rp 5.000, lalu klik **Lanjut Checkout** dan pilih **Bayar Sekarang (QRIS)**.
3. **Langkah 3:** Masuk ke tab **2. Mitra UMKM**, amati sub-order yang masuk dan lakukan uji suara notifikasi nyaring.
4. **Langkah 4:** Pada tampilan pedagang, klik tombol **Barang Siap & Serahkan ke Titik Hub Pasar**.
5. **Langkah 5:** Buka tab **4. Admin Hub**, periksa checklist barang yang sudah tiba di Meja Gate 2, lalu klik **Satukan Jadi 1 Paket & Tugaskan Kurir**.
6. **Langkah 6:** Masuk ke tab **3. Kurir Lokal**, periksa rute peta dan klik **Ambil Paket & Mulai Antar**.
7. **Langkah 7:** Kembali ke tab **1. Konsumen**, buka **Status Pesanan**, lalu klik tombol **Konfirmasi Pesanan Diterima**.
8. **Langkah 8:** Buka kembali tab **2. Mitra UMKM**, perhatikan saldo dompet bertambah 100% utuh tanpa potongan komisi!