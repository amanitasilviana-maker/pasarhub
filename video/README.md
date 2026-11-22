# PasarHub Video Demo (Remotion)

Proyek video presentasi & demo aplikasi web **PasarHub** berbasis **Remotion**, **React**, dan **TypeScript**.

## 🎥 Spesifikasi Video
- **Resolusi**: 1920x1080 (HD / 16:9)
- **Frame Rate**: 30 FPS
- **Durasi**: 30 Detik (900 Frames)
- **Tema Desain**: Modern Tech-Startup UI
  - **Eco-Green**: `#10B981`
  - **Vibrant Orange**: `#F97316`
  - **Clean Off-White**: `#F8FAFC`
  - **Dark Slate**: `#0F172A`

---

## 🎬 Pembagian 5 Scene

1. **Scene 1: Intro & Hook** (Frames 0 - 150 | 5 Detik)
   - Animasi spring logo vektor PasarHub (keranjang pasar + titik hub jaringan)
   - Judul besar *PasarHub* & subjudul *Digitalisasi Pasar Tradisional Otonom Berbasis Konsolidasi Logistik*
   - Badge proposisi nilai (Multi-Lapak 1 Keranjang, Ongkir Flat Hiperlokal, Sistem Escrow)

2. **Scene 2: Masalah / Latar Belakang** (Frames 150 - 330 | 6 Detik)
   - Judul: *Kendala Belanja Pasar Tradisional Saat Ini*
   - 4 kartu UI animasi bertahap (staggered entrance) dengan data survei:
     - **56,3%** Pembayaran Digital Terbatas
     - **50,0%** Ongkir E-Commerce Nasional Mahal
     - **43,8%** Tidak Ada Katalog & Harga Pasti
     - **37,5%** Respon Penjual via Chat Lambat

3. **Scene 3: Simulasi UI Aplikasi & Keranjang Bersama** (Frames 330 - 570 | 8 Detik)
   - Mockup jendela browser aplikasi web PasarHub
   - Simulasi kursor interaktif memilih 3 produk dari lapak berbeda:
     - *Sayur Bayam Segar* — Lapak Bu Siti (Rp 3.500)
     - *Daging Ayam Broiler* — Lapak Pak Budi (Rp 28.000)
     - *Paket Bumbu Dapur* — Lapak Mas Eko (Rp 5.000)
   - Masuk ke Keranjang Bersama (*Cross-Merchant Cart*)
   - Rincian checkout 1x bayar dengan **Ongkir Flat Rp 3.000** dan verifikasi pembayaran via QRIS Escrow

4. **Scene 4: Alur Logistik Hub-and-Spoke** (Frames 570 - 750 | 6 Detik)
   - Diagram alur animasi 4 tahap dengan garis konektor dinamis:
     - `[01. Pesanan Dipecah ke Lapak]`
     - ➔ `[02. Konsolidasi di Titik HUB Pasar (Gate 2)]`
     - ➔ `[03. Diantar Kurir Internal Lokal]`
     - ➔ `[04. Barang Diterima & Dana Cair 100% ke Pedagang]`

5. **Scene 5: Closing & Call to Action** (Frames 750 - 900 | 5 Detik)
   - Ringkasan 3 pilar dampak:
     - *Komisi Rendah (2-5%)*
     - *Ekonomi Sirkular*
     - *UMKM Naik Kelas*
   - Logo PasarHub & penutup: *Belanja Pasar Tradisional, Praktis & Aman*
   - Call to action `pasarhub.id`

---

## 🚀 Cara Menjalankan

### 1. Masuk ke folder video & install dependensi:
```bash
cd video
npm install
```

### 2. Jalankan Remotion Studio (Pratinjau Interaktif):
```bash
npm run dev
```
Remotion Studio akan terbuka secara otomatis di browser pada `http://localhost:3000`.

### 3. Render ke File Video MP4:
```bash
npm run build
```
File video hasil render akan tersimpan di `video/out/video.mp4`.

