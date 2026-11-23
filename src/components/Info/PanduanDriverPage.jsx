import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './info.css';

const FAQ_DRIVER = [
    {
        q: 'Apakah kurir harus menalangi uang belanja pedagang terlebih dahulu?',
        a: 'Tidak perlu sama sekali. Seluruh transaksi di PasarHub dibayar di muka oleh pembeli melalui QRIS atau E-Wallet dan diamankan oleh sistem Smart Escrow. Kurir cukup mengambil paket di Meja Hub dan mengantarnya.',
    },
    {
        q: 'Bagaimana jika pembeli memesan dari 5 lapak berbeda di dalam pasar?',
        a: 'Anda tetap mengambilnya di satu titik saja, yaitu Meja Konsolidasi Hub. Masing-masing pedagang yang mengantarkan barangnya ke Hub, lalu Admin Hub menyatukannya menjadi satu paket siap angkut untuk Anda.',
    },
    {
        q: 'Bagaimana jika pembeli tidak merespons saat kurir tiba di alamat tujuan?',
        a: 'Hubungi pembeli melalui tombol WhatsApp yang tersedia di kartu pesanan. Jika tetap tidak dapat dihubungi dalam 15 menit, hubungi Admin Paguyuban melalui posko Hub untuk instruksi pengamanan paket.',
    },
];

export default function PanduanDriverPage() {
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
                            <Link to="/panduan-mitra">Panduan Mitra</Link>
                            <Link to="/panduan-driver" className="active-link">
                                Panduan Driver
                            </Link>
                            <Link to="/informasi">Tentang Kami</Link>
                        </nav>
                    </div>

                    <div className="info-nav-right">
                        <Link to="/driver" className="info-btn-visit">
                            <span>Buka Portal Driver</span>
                            <span>&rarr;</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* TUTORIAL HERO */}
            <section className="tutorial-hero driver-theme">
                <div className="info-container">
                    <span className="tutorial-badge-role">Panduan Resmi Kurir Lokal &amp; Armada Hub</span>
                    <h1>Tutorial Kerja Mitra Driver PasarHub: Cepat, Adil, &amp; Tanpa Keliling Pasar</h1>
                    <p>
                        Sistem kerja hiperlokal yang menghargai tenaga kurir warga setempat. Ambil paket yang sudah disatukan di titik Hub dan antar langsung ke alamat pembeli dengan upah adil.
                    </p>
                </div>
            </section>

            {/* QUICK STEP NAVIGATION */}
            <div className="step-jump-bar driver-theme">
                <div className="info-container">
                    <div className="step-jump-list">
                        <a href="#langkah-1" className="step-jump-btn">1. Verifikasi Dokumen</a>
                        <a href="#langkah-2" className="step-jump-btn">2. Aktifkan Status Siap Antar</a>
                        <a href="#langkah-3" className="step-jump-btn">3. Ambil Paket Tunggal di Hub</a>
                        <a href="#langkah-4" className="step-jump-btn">4. Pengantaran &amp; Kontak Pembeli</a>
                        <a href="#langkah-5" className="step-jump-btn">5. Selesaikan Order &amp; Upah</a>
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
                                <div className="step-number orange">1</div>
                                <div className="step-title-group">
                                    <span className="orange-text">Tahap Registrasi • Keamanan Komunitas</span>
                                    <h2>Verifikasi Dokumen Fisik di Posko Paguyuban Pasar</h2>
                                </div>
                            </div>
                            <div className="step-card-content">
                                <p>
                                    PasarHub memprioritaskan pemuda dan warga sekitar pasar sebagai kurir resmi. Untuk menjamin keamanan paket belanjaan warga, akun kurir wajib diverifikasi oleh Admin Hub sebelum menerima tugas.
                                </p>
                                <div className="checklist-box orange">
                                    <h4>Syarat Kelengkapan Dokumen Kurir:</h4>
                                    <ul>
                                        <li>
                                            <strong>KTP Asli:</strong> Diutamakan berdomisili di sekitar area pasar tradisional.
                                        </li>
                                        <li>
                                            <strong>SIM C &amp; STNK Aktif:</strong> Wajib berlaku dan sesuai dengan kendaraan operasional yang digunakan.
                                        </li>
                                        <li>
                                            <strong>Aktivasi Admin:</strong> Setelah berkas dicek, status akun Anda berubah menjadi <strong>Kurir Terverifikasi</strong>.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </article>

                        {/* STEP 2 */}
                        <article id="langkah-2" className="step-card">
                            <div className="step-card-header">
                                <div className="step-number">2</div>
                                <div className="step-title-group">
                                    <span className="orange-text">Portal Driver (/driver) • Kendali Jam Kerja</span>
                                    <h2>Mengaktifkan Sakelar Status &ldquo;Siap Terima Order&rdquo;</h2>
                                </div>
                            </div>
                            <div className="step-card-content">
                                <p>
                                    Login ke <strong>Portal Driver (/driver)</strong> saat Anda sudah berada di area posko pasar dan siap bekerja. Anda memiliki kendali penuh untuk mengaktifkan status operasional atau beristirahat kapan saja.
                                </p>
                                <div className="ui-mockup-box">
                                    <span className="ui-mockup-label">Tampilan Sakelar Status Operasional Kurir:</span>
                                    <div className="mock-status-row">
                                        <span>
                                            Status Operasional Kurir:{' '}
                                            <strong style={{ color: 'var(--primary)' }}>
                                                AKTIF (Siap Terima Paket Hub)
                                            </strong>
                                        </span>
                                        <span className="mock-btn" style={{ backgroundColor: '#EF4444' }}>
                                            Nonaktifkan (Istirahat)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* STEP 3 */}
                        <article id="langkah-3" className="step-card">
                            <div className="step-card-header">
                                <div className="step-number orange">3</div>
                                <div className="step-title-group">
                                    <span className="orange-text">Keunggulan Hub-and-Spoke • Hemat Waktu</span>
                                    <h2>Mengambil Paket Konsolidasi di Meja Hub Gate 2</h2>
                                </div>
                            </div>
                            <div className="step-card-content">
                                <p>
                                    Anda <strong>tidak perlu masuk dan berkeliling mencari lapak satu per satu</strong> di dalam pasar. Admin Hub sudah mengumpulkan dan mengecek seluruh item pesanan dari berbagai pedagang menjadi satu paket utuh.
                                </p>
                                <div className="checklist-box">
                                    <h4>Prosedur Pengambilan di Titik Hub:</h4>
                                    <ul>
                                        <li>
                                            Cocokkan <strong>Kode Order Induk</strong> pada aplikasi driver dengan label kemasan di Meja Konsolidasi Hub.
                                        </li>
                                        <li>
                                            Pastikan seluruh kantong belanjaan (sayur, bumbu, daging) sudah terikat rapi dan aman untuk dibawa di motor.
                                        </li>
                                        <li>
                                            Tekan tombol <strong>Ambil Paket dari Hub &amp; Mulai Antar</strong> sebelum berangkat.
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
                                    <span className="orange-text">Navigasi Hiperlokal • Komunikasi Cepat</span>
                                    <h2>Mengantar ke Alamat Pembeli &amp; Koordinasi WhatsApp</h2>
                                </div>
                            </div>
                            <div className="step-card-content">
                                <p>
                                    Jarak pengantaran terfokus pada radius kelurahan/kecamatan sekitar pasar sehingga rute lebih singkat dan hemat bahan bakar. Gunakan peta rute lokal pada dasbor driver untuk menuju titik alamat pembeli.
                                </p>
                                <div className="checklist-box">
                                    <h4>Etika &amp; Standar Pengantaran:</h4>
                                    <ul>
                                        <li>
                                            Gunakan tombol <strong>Hubungi via WhatsApp</strong> pada kartu pesanan jika membutuhkan patokan rumah atau kos pembeli.
                                        </li>
                                        <li>
                                            Jaga posisi bahan makanan segar dan bahan basah agar tidak tergencet selama perjalanan.
                                        </li>
                                        <li>
                                            Pembeli sudah melunasi pembayaran secara non-tunai (QRIS/E-Wallet) melalui sistem Smart Escrow, sehingga Anda tidak perlu menagih uang tunai.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </article>

                        {/* STEP 5 */}
                        <article id="langkah-5" className="step-card">
                            <div className="step-card-header">
                                <div className="step-number orange">5</div>
                                <div className="step-title-group">
                                    <span className="orange-text">Keadilan Upah • Pencairan Transparan</span>
                                    <h2>Konfirmasi Paket Tiba &amp; Penerimaan Upah Antar</h2>
                                </div>
                            </div>
                            <div className="step-card-content">
                                <p>
                                    Setelah paket diserahkan langsung kepada pembeli di lokasi tujuan, tekan tombol <strong>Konfirmasi Paket Tiba di Lokasi Konsumen</strong> untuk menyelesaikan trip dan mencairkan dana Smart Escrow.
                                </p>
                                <div className="ui-mockup-box">
                                    <span className="ui-mockup-label">Tombol Penyelesaian Tugas Pengantaran:</span>
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
                                            Klik setelah barang diterima pembeli:
                                        </span>
                                        <span className="mock-btn" style={{ backgroundColor: '#0284C7' }}>
                                            ✓ Konfirmasi Paket Tiba di Lokasi Konsumen
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* Right Column: Sidebar */}
                    <aside>
                        <div className="sidebar-card">
                            <h3>Keuntungan Mitra Driver</h3>
                            <div className="benefit-row">
                                <span>Titik Ambil Barang</span>
                                <strong style={{ color: 'var(--primary)' }}>1 Titik (Meja Hub)</strong>
                            </div>
                            <div className="benefit-row">
                                <span>Skema Upah Antar</span>
                                <strong style={{ color: 'var(--accent-orange)' }}>Adil &amp; Transparan</strong>
                            </div>
                            <div className="benefit-row">
                                <span>Jangkauan Rute</span>
                                <strong>Hiperlokal Sekitar Pasar</strong>
                            </div>
                            <div className="benefit-row">
                                <span>Sistem Pembayaran</span>
                                <strong>Non-Tunai (Escrow)</strong>
                            </div>

                            <div style={{ marginTop: '20px' }}>
                                <Link
                                    to="/driver"
                                    className="info-btn-visit"
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        backgroundColor: 'var(--accent-orange)',
                                    }}
                                >
                                    Masuk ke Portal Driver &rarr;
                                </Link>
                            </div>
                        </div>

                        <div
                            className="sidebar-card"
                            style={{ backgroundColor: '#FFF7ED', borderColor: 'var(--accent-orange)' }}
                        >
                            <h3 style={{ color: '#9A3412' }}>Ingin Bergabung Jadi Kurir Lokal?</h3>
                            <p style={{ fontSize: '13.5px', color: 'var(--text-main)', marginBottom: '14px' }}>
                                Datang langsung ke Posko Admin Hub Pasar dengan membawa KTP, SIM C, dan STNK aktif untuk proses pendataan armada kurir komunitas.
                            </p>
                            <Link
                                to="/informasi"
                                style={{
                                    fontSize: '13.5px',
                                    fontWeight: 800,
                                    color: '#9A3412',
                                    textDecoration: 'underline',
                                }}
                            >
                                Lihat Lokasi Posko Hub &rarr;
                            </Link>
                        </div>
                    </aside>
                </div>
            </main>

            {/* FAQ SECTION */}
            <section className="faq-section">
                <div className="info-container">
                    <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '24px' }}>
                        Pertanyaan Umum Mitra Driver (FAQ)
                    </h2>

                    {FAQ_DRIVER.map((item, idx) => (
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