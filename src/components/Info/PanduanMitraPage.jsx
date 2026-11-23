import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './info.css';

const FAQ_MITRA = [
    {
        q: 'Apakah pedagang dikenakan potongan komisi dari setiap barang yang terjual?',
        a: 'Tidak ada potongan sama sekali (0%). PasarHub dikelola secara otonom oleh paguyuban dan koperasi pasar sehingga 100% nilai harga barang menjadi hak penuh pedagang. Biaya operasional kurir ditanggung dari tarif ongkos kirim flat pembeli.',
    },
    {
        q: 'Bagaimana jika pembeli memesan barang dari 3 lapak berbeda sekaligus?',
        a: 'Anda hanya perlu menyiapkan barang yang dipesan dari lapak Anda sendiri. Nantinya petugas di Meja Konsolidasi Hub yang akan menggabungkan paket dari lapak Anda dengan paket dari lapak lainnya sebelum dibawa oleh kurir.',
    },
    {
        q: 'Apakah saya bisa menutup lapak sementara jika stok hari ini sudah habis?',
        a: 'Ya, Anda dapat mengatur status ketersediaan stok atau status operasional lapak melalui Portal Pedagang agar pembeli tidak memesan barang yang sudah habis.',
    },
];

export default function PanduanMitraPage() {
    const [openFaqIndex, setOpenFaqIndex] = useState(0);
    const [logoError, setLogoError] = useState(false);

    const toggleFaq = (idx) => {
        setOpenFaqIndex((prev) => (prev === idx ? null : idx));
    };

    return (
        <div className="info-scope">
            {/* NAVBAR */}
            <header className="info-navbar">
                <div className="info-container info-nav-inner">
                    <div className="info-nav-left">
                        <Link to="/informasi" className="info-brand-lockup">
                            <div className="info-brand-logo-box">
                                {!logoError ? (
                                    <img
                                        src="/logo.png"
                                        alt="Logo PasarHub"
                                        onError={() => setLogoError(true)}
                                    />
                                ) : (
                                    <span className="info-brand-fallback">HUB</span>
                                )}
                            </div>
                            <div className="info-brand-text-stack">
                                <span className="info-brand-name">PasarHub</span>
                                <span className="info-brand-tagline">BELANJA PASAR TRADISIONAL</span>
                            </div>
                        </Link>

                        <nav className="info-nav-links">
                            <Link to="/informasi">Beranda</Link>
                            <Link to="/panduan-mitra" className="active-link">
                                Panduan Mitra
                            </Link>
                            <Link to="/panduan-driver">Panduan Driver</Link>
                            <Link to="/informasi">Tentang Kami</Link>
                        </nav>
                    </div>

                    <div className="info-nav-right">
                        <Link to="/umkm" className="info-btn-visit">
                            <span>Buka Portal Pedagang</span>
                            <span>&rarr;</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* TUTORIAL HERO */}
            <section className="tutorial-hero">
                <div className="info-container">
                    <span className="tutorial-badge-role">Panduan Resmi Mitra UMKM Pasar</span>
                    <h1>Tutorial Lengkap Berjualan di PasarHub (0% Potongan Komisi)</h1>
                    <p>
                        Ikuti 5 langkah praktis mulai dari pendaftaran lapak melalui paguyuban, pengisian katalog dagangan, hingga pencairan dana penjualan 100% utuh ke rekening Anda.
                    </p>
                </div>
            </section>

            {/* QUICK STEP NAVIGATION */}
            <div className="step-jump-bar">
                <div className="info-container">
                    <div className="step-jump-list">
                        <a href="#langkah-1" className="step-jump-btn">1. Pendaftaran &amp; Verifikasi</a>
                        <a href="#langkah-2" className="step-jump-btn">2. Tambah Produk Dagangan</a>
                        <a href="#langkah-3" className="step-jump-btn">3. Terima Pesanan (Notif Suara)</a>
                        <a href="#langkah-4" className="step-jump-btn">4. Serah Terima ke Meja Hub</a>
                        <a href="#langkah-5" className="step-jump-btn">5. Tarik Saldo 100% Bersih</a>
                    </div>
                </div>
            </div>

            {/* MAIN TUTORIAL CONTENT */}
            <main className="tutorial-body">
                <div className="info-container tutorial-layout">
                    <div>
                        {/* STEP 1 */}
                        <article id="langkah-1" className="step-card">
                            <div className="step-card-header">
                                <div className="step-number">1</div>
                                <div className="step-title-group">
                                    <span>Tahap Awal • Onboarding Lapak</span>
                                    <h2>Pendaftaran Akun &amp; Verifikasi Pengurus Pasar</h2>
                                </div>
                            </div>
                            <div className="step-card-content">
                                <p>
                                    Untuk menjaga keaslian pedagang pasar tradisional, setiap lapak baru didaftarkan dan diverifikasi secara langsung oleh Pengurus Paguyuban / Admin Hub Pasar setempat.
                                </p>
                                <div className="checklist-box">
                                    <h4>Berkas &amp; Data yang Perlu Disiapkan:</h4>
                                    <ul>
                                        <li>
                                            <strong>Identitas Pemilik:</strong> Nama lengkap dan nomor WhatsApp aktif untuk login &amp; notifikasi pesanan.
                                        </li>
                                        <li>
                                            <strong>Informasi Lapak:</strong> Nama toko/lapak (contoh: <em>Lapak Sayur Segar Bu Siti</em>) serta lokasi los/blok di dalam pasar.
                                        </li>
                                        <li>
                                            <strong>Verifikasi Fisik:</strong> Pengurus pasar mencocokkan data lapak Anda untuk mengaktifkan status <strong>Lapak Terverifikasi</strong>.
                                        </li>
                                    </ul>
                                </div>
                                <div className="ui-mockup-box">
                                    <span className="ui-mockup-label">Contoh Status di Portal Pedagang (/umkm):</span>
                                    <div className="mock-alert-bar">
                                        <span>
                                            ⏳ Status Awal: Menunggu Verifikasi Admin Pasar (Anda sudah bisa menyusun draf produk)
                                        </span>
                                        <span className="mock-btn" style={{ backgroundColor: '#15803D' }}>
                                            ✓ Lapak Aktif
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* STEP 2 */}
                        <article id="langkah-2" className="step-card">
                            <div className="step-card-header">
                                <div className="step-number">2</div>
                                <div className="step-title-group">
                                    <span>Pengelolaan Katalog • Harga Transparan</span>
                                    <h2>Menambahkan Produk &amp; Mengatur Harga Harian</h2>
                                </div>
                            </div>
                            <div className="step-card-content">
                                <p>
                                    Masuk ke halaman <strong>Portal Pedagang (/umkm)</strong>, lalu tekan tombol hijau <strong>+ Tambah Dagangan Baru</strong>. Anda dapat memperbarui harga komoditas setiap pagi mengikuti harga pasar terkini.
                                </p>
                                <div className="checklist-box">
                                    <h4>Tips Mengisi Data Produk agar Cepat Laku:</h4>
                                    <ul>
                                        <li>
                                            Gunakan nama barang yang jelas disertai berat/takaran (misal: <em>Cabai Rawit Merah 250g</em> atau <em>Ayam Potong Segar 1 Ekor</em>).
                                        </li>
                                        <li>
                                            Pilih kategori yang sesuai (Sayur, Daging &amp; Ayam, Bumbu Dapur, Ikan &amp; Seafood, Sembako, atau Buah).
                                        </li>
                                        <li>
                                            Tulis keterangan kesegaran barang pada kolom deskripsi singkat.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </article>

                        {/* STEP 3 */}
                        <article id="langkah-3" className="step-card">
                            <div className="step-card-header">
                                <div className="step-number orange">3</div>
                                <div className="step-title-group">
                                    <span>Order Splitting • Anti-Terlewat</span>
                                    <h2>Menerima Pesanan Masuk dengan Notifikasi Nyaring</h2>
                                </div>
                            </div>
                            <div className="step-card-content">
                                <p>
                                    Saat pembeli memesan barang dari beberapa lapak sekaligus, sistem PasarHub secara otomatis memecah pesanan tersebut (<em>Order Splitting</em>) dan mengirimkan daftar barang khusus lapak Anda saja.
                                </p>
                                <div className="checklist-box">
                                    <h4>Hal yang Perlu Anda Lakukan Saat Bel Pesanan Berbunyi:</h4>
                                    <ul>
                                        <li>
                                            Periksa daftar barang dan jumlah kuantitas pada kartu <strong>Sub-Order Lapak</strong>.
                                        </li>
                                        <li>
                                            Perhatikan <strong>Catatan Khusus Pembeli</strong> (misalnya: <em>"Ayam minta dipotong 8 bagian"</em> atau <em>"Tempe pilih yang belum terlalu matang"</em>).
                                        </li>
                                        <li>
                                            Kemas barang menggunakan kantong bersih dan tempelkan kode ID Sub-Order.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </article>

                        {/* STEP 4 */}
                        <article id="langkah-4" className="step-card">
                            <div className="step-card-header">
                                <div className="step-number">4</div>
                                <div className="step-title-group">
                                    <span>Logistik Hub-and-Spoke</span>
                                    <h2>Menyerahkan Barang Siap Kemas ke Titik Kumpul Hub</h2>
                                </div>
                            </div>
                            <div className="step-card-content">
                                <p>
                                    Setelah seluruh item pesanan lapak selesai dikemas, bawa paket tersebut ke <strong>Meja Konsolidasi Hub Pasar</strong> (misal: Posko Gate 2). Anda tidak perlu mencari kurir satu per satu.
                                </p>
                                <div className="ui-mockup-box">
                                    <span className="ui-mockup-label">Tombol Aksi di Kartu Pesanan Anda:</span>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                            gap: '10px',
                                        }}
                                    >
                                        <span style={{ fontSize: '13px', fontWeight: 700 }}>
                                            Klik tombol ini tepat saat menyerahkan barang ke petugas Hub:
                                        </span>
                                        <span className="mock-btn">
                                            Konfirmasi: Barang Siap &amp; Serahkan ke Titik Hub Pasar
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* STEP 5 */}
                        <article id="langkah-5" className="step-card">
                            <div className="step-card-header">
                                <div className="step-number">5</div>
                                <div className="step-title-group">
                                    <span>Smart Escrow • Hak Penuh Pedagang</span>
                                    <h2>Pencairan Dana Penjualan 100% Tanpa Potongan</h2>
                                </div>
                            </div>
                            <div className="step-card-content">
                                <p>
                                    Begitu kurir mengantarkan paket ke rumah pembeli dan pembeli mengonfirmasi penerimaan barang, dana dari <strong>Rekening Bersama Smart Escrow</strong> langsung masuk ke Saldo Bersih lapak Anda.
                                </p>
                                <div className="checklist-box">
                                    <h4>Keunggulan Dompet Digital Pedagang PasarHub:</h4>
                                    <ul>
                                        <li>
                                            <strong>Potongan Komisi 0%:</strong> Jika Anda menjual barang seharga Rp 50.000, maka saldo yang masuk adalah utuh Rp 50.000.
                                        </li>
                                        <li>
                                            <strong>Tarik Saldo Instan:</strong> Tekan tombol <strong>Tarik Saldo Instan (Rp 0 Biaya)</strong> kapan saja untuk mentransfer saldo ke rekening bank atau e-wallet pribadi Anda.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* Right Column: Sidebar */}
                    <aside>
                        <div className="sidebar-card">
                            <h3>Ringkasan Hak Mitra Pedagang</h3>
                            <div className="benefit-row">
                                <span>Potongan Komisi Aplikasi</span>
                                <strong style={{ color: 'var(--primary)' }}>0% (Gratis)</strong>
                            </div>
                            <div className="benefit-row">
                                <span>Biaya Pencairan Saldo</span>
                                <strong style={{ color: 'var(--primary)' }}>Rp 0</strong>
                            </div>
                            <div className="benefit-row">
                                <span>Pengantaran ke Pembeli</span>
                                <strong>Kurir Internal Hub</strong>
                            </div>
                            <div className="benefit-row">
                                <span>Jaminan Pembayaran</span>
                                <strong>Smart Escrow</strong>
                            </div>

                            <div style={{ marginTop: '20px' }}>
                                <Link
                                    to="/umkm"
                                    className="info-btn-visit"
                                    style={{ width: '100%', justifyContent: 'center' }}
                                >
                                    Masuk ke Portal Pedagang &rarr;
                                </Link>
                            </div>
                        </div>

                        <div
                            className="sidebar-card"
                            style={{ backgroundColor: 'var(--primary-subtle)', borderColor: 'var(--primary)' }}
                        >
                            <h3 style={{ color: 'var(--primary-dark)' }}>Butuh Bantuan Pendaftaran?</h3>
                            <p style={{ fontSize: '13.5px', color: 'var(--text-main)', marginBottom: '14px' }}>
                                Kunjungi Posko Paguyuban Pasar Hub di pintu masuk utama pasar atau hubungi koordinator blok lapak Anda untuk dibantu membuatkan akun lapak.
                            </p>
                            <Link
                                to="/informasi"
                                style={{
                                    fontSize: '13.5px',
                                    fontWeight: 800,
                                    color: 'var(--primary-dark)',
                                    textDecoration: 'underline',
                                }}
                            >
                                Lihat Kontak Pengurus Paguyuban &rarr;
                            </Link>
                        </div>
                    </aside>
                </div>
            </main>

            {/* FAQ SECTION */}
            <section className="faq-section">
                <div className="info-container">
                    <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '24px' }}>
                        Pertanyaan Umum Mitra Pedagang (FAQ)
                    </h2>

                    {FAQ_MITRA.map((item, idx) => (
                        <div className="faq-item" key={item.q}>
                            <button
                                type="button"
                                className="faq-question"
                                onClick={() => toggleFaq(idx)}
                            >
                                <span>{item.q}</span>
                                <span>{openFaqIndex === idx ? '−' : '+'}</span>
                            </button>
                            {openFaqIndex === idx && <div className="faq-answer">{item.a}</div>}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}