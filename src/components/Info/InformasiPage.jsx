import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './info.css';

const ECOSYSTEM_DATA = {
    konsumen: [
        {
            category: 'Belanja Lintas Lapak',
            desc: 'Belanja sayur, daging, bumbu, dan sembako dari banyak pedagang sekaligus dalam satu kali transaksi.',
            items: [
                {
                    icon: '🛒',
                    orange: false,
                    name: 'Keranjang Bersama (Cross-Merchant Cart)',
                    badge: 'Fitur Unggulan',
                    text: 'Gabungkan belanjaan dari berbagai lapak berbeda dalam satu keranjang dan cukup bayar satu kali ongkos kirim flat yang terjangkau.',
                },
                {
                    icon: '📋',
                    orange: false,
                    name: 'Katalog Digital & Harga Pasti Transparan',
                    badge: 'Anti-Ribet',
                    text: 'Lihat foto produk segar, stok harian, dan harga pasti secara real-time tanpa perlu menunggu balasan chat manual.',
                },
                {
                    icon: '📝',
                    orange: true,
                    name: 'Catatan Khusus Per Item Belanjaan',
                    badge: 'Personal',
                    text: 'Tulis instruksi spesifik layaknya belanja tatap muka, seperti ukuran potongan ayam atau pilihan tingkat kematangan buah.',
                    extra: true,
                },
            ],
        },
        {
            category: 'Pembayaran & Keamanan',
            desc: 'Jaminan perlindungan dana konsumen dan kecepatan pengantaran hiperlokal di bawah 90 menit.',
            items: [
                {
                    icon: '🛡️',
                    orange: false,
                    name: 'Smart Escrow (Rekening Bersama Terproteksi)',
                    badge: '100% Aman',
                    text: 'Dana pembayaran QRIS atau E-Wallet Anda ditahan aman oleh sistem dan baru dicairkan ke pedagang setelah Anda mengonfirmasi barang tiba lengkap.',
                },
                {
                    icon: '🛵',
                    orange: true,
                    name: 'Pengantaran Kurir Lokal atau Pick-Up di Hub',
                    badge: 'Fleksibel',
                    text: 'Pilih layanan antar langsung ke depan pintu rumah/kos dengan tarif flat, atau ambil sendiri paket yang sudah dikemas rapi di posko Hub pasar.',
                    extra: true,
                },
            ],
        },
    ],
    mitra: [
        {
            category: 'Kemandirian UMKM Pasar',
            desc: 'Digitalisasi lapak tradisional tanpa mengubah kearifan lokal dan tanpa potongan komisi besar.',
            items: [
                {
                    icon: '🏪',
                    orange: false,
                    name: 'Pendapatan Bersih 100% (0% Potongan Komisi)',
                    badge: 'Berdaulat',
                    text: 'Seluruh hasil penjualan barang langsung masuk ke dompet digital pedagang secara utuh tanpa dipotong komisi platform asing.',
                },
                {
                    icon: '⚡',
                    orange: false,
                    name: 'Sistem Pemecahan Pesanan Otomatis (Order Splitting)',
                    badge: 'Otomatis',
                    text: 'Setiap pesanan lintas lapak otomatis dipecah menjadi sub-order khusus lapak Anda lengkap dengan notifikasi suara nyaring agar mudah dipantau.',
                },
                {
                    icon: '💬',
                    orange: true,
                    name: 'Pendaftaran Praktis & Draf Katalog Mandiri',
                    badge: 'Mudah Digunakan',
                    text: 'Proses pendaftaran pedagang dibantu pengurus paguyuban melalui WhatsApp dengan antarmuka pengelolaan stok yang ramah untuk semua usia.',
                    extra: true,
                },
            ],
        },
    ],
    driver: [
        {
            category: 'Keadilan Upah & Efisiensi Kerja',
            desc: 'Memberdayakan warga sekitar pasar sebagai kurir internal dengan alur kerja yang manusiawi dan transparan.',
            items: [
                {
                    icon: '⚖️',
                    orange: true,
                    name: 'Keadilan Upah Pengantaran Hiperlokal',
                    badge: 'Upah Adil',
                    text: 'Skema tarif ongkir flat yang adil tanpa potongan algoritma eksploitatif, menjaga kesejahteraan kurir warga setempat.',
                },
                {
                    icon: '📦',
                    orange: false,
                    name: 'Titik Pengambilan Tunggal di Meja Hub',
                    badge: 'Hemat Waktu',
                    text: 'Kurir tidak perlu berkeliling mencari lapak satu per satu di dalam pasar. Seluruh item pesanan sudah disatukan menjadi satu paket siap antar di titik Hub.',
                },
                {
                    icon: '📍',
                    orange: false,
                    name: 'Navigasi Rute Hiperlokal & Kontak Langsung',
                    badge: 'Tepat Sasaran',
                    text: 'Jarak pengantaran terfokus pada radius kecamatan sekitar pasar sehingga perputaran trip lebih cepat dan hemat bahan bakar.',
                    extra: true,
                },
            ],
        },
    ],
    komunitas: [
        {
            category: 'Tata Kelola Otonom Paguyuban',
            desc: 'Kendali penuh ekosistem digital berada di tangan pengurus pasar, koperasi, dan komunitas lokal.',
            items: [
                {
                    icon: '🏢',
                    orange: false,
                    name: 'Stasiun Konsolidasi Hub-and-Spoke',
                    badge: 'Inti Sistem',
                    text: 'Dasbor verifikasi kelengkapan barang dari berbagai lapak sebelum disatukan menjadi paket utuh dan diserahkan ke kurir lokal.',
                },
                {
                    icon: '📊',
                    orange: false,
                    name: 'Buku Kas Smart Escrow Transparan',
                    badge: 'Akuntabel',
                    text: 'Pemantauan arus kas transaksi harian, dana tertahan, dan pencairan otomatis ke saldo masing-masing pedagang secara real-time.',
                },
                {
                    icon: '🤝',
                    orange: true,
                    name: 'Verifikasi Mitra & Resolusi Sengketa Warga',
                    badge: 'Otonom',
                    text: 'Pengurus pasar memiliki otoritas penuh memverifikasi keaslian lapak pedagang, kelengkapan dokumen kurir, serta menengahi kendala transaksi.',
                    extra: true,
                },
            ],
        },
    ],
};

export default function InformasiPage() {
    const [currentTab, setCurrentTab] = useState('konsumen');
    const [showAllFeatures, setShowAllFeatures] = useState(false);
    const [logoError, setLogoError] = useState(false);

    const handleNavTabSelect = (tabKey) => {
        setCurrentTab(tabKey);
        const el = document.getElementById('ekosistem');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const groups = ECOSYSTEM_DATA[currentTab] || [];

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
                            <a
                                href="#ekosistem"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavTabSelect('konsumen');
                                }}
                            >
                                Konsumen
                            </a>
                            <a
                                href="#ekosistem"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavTabSelect('mitra');
                                }}
                            >
                                Mitra Pedagang
                            </a>
                            <a
                                href="#ekosistem"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavTabSelect('driver');
                                }}
                            >
                                Mitra Driver
                            </a>
                            <a
                                href="#ekosistem"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavTabSelect('komunitas');
                                }}
                            >
                                Pengelolaan Komunitas
                            </a>
                        </nav>
                    </div>

                    <div className="info-nav-right">
                        <Link to="/" className="info-btn-visit">
                            <span>Kunjungi PasarHub</span>
                            <span>&rarr;</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* HERO BANNER */}
            <section className="info-hero">
                <div className="info-container">
                    <div className="info-hero-content">
                        <span className="info-hero-eyebrow">Kedaulatan Ekonomi Digital Milik Bangsa</span>
                        <h1 className="info-hero-title">
                            PasarHub. Digitalisasi Pasar Tradisional Tanpa Potongan Komisi.
                        </h1>
                        <p className="info-hero-subtitle">
                            Platform SaaS otonom karya anak bangsa yang menghubungkan pedagang pasar, kurir warga lokal, dan pembeli dalam satu ekosistem logistik terpadu yang adil dan transparan.
                        </p>
                        <div className="info-hero-actions">
                            <Link to="/" className="info-btn-hero-primary">
                                Kunjungi PasarHub Sekarang
                            </Link>
                            <a href="#pilar-kedaulatan" className="info-btn-hero-outline">
                                Pelajari Prinsip Keadilan Kami
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* STACKED STRIP BARS */}
            <div className="info-bar-dark">
                <div className="info-container info-bar-dark-inner">
                    <span>
                        🇮🇩 100% Independensi Marketplace Digital Nasional — Dikelola Otonom oleh Paguyuban &amp; Koperasi Pasar
                    </span>
                    <span style={{ color: '#86EFAC' }}>Potongan Komisi Platform: 0% untuk UMKM</span>
                </div>
            </div>

            <Link to="/" style={{ display: 'block' }}>
                <div className="info-bar-green">
                    <div className="info-container info-bar-green-inner">
                        <span>
                            Kunjungi PasarHub — Belanja Lintas Lapak dengan Ongkir Flat Hiperlokal &amp; Keamanan Smart Escrow
                        </span>
                        <span>Masuk ke Aplikasi &rarr;</span>
                    </div>
                </div>
            </Link>

            {/* ECOSYSTEM & FEATURES SECTION */}
            <section id="ekosistem" className="info-ecosystem-section">
                <div className="info-container">
                    <h2 className="info-section-heading">
                        Dari kebutuhan dapur sehari-hari hingga keadilan penghasilan warga lokal. Satu platform berdaulat.
                    </h2>

                    {/* 4 Tab Utama */}
                    <div className="info-persona-tabs" role="tablist">
                        <button
                            type="button"
                            className={`info-tab-btn ${currentTab === 'konsumen' ? 'active' : ''}`}
                            onClick={() => setCurrentTab('konsumen')}
                        >
                            Konsumen
                        </button>
                        <button
                            type="button"
                            className={`info-tab-btn ${currentTab === 'mitra' ? 'active' : ''}`}
                            onClick={() => setCurrentTab('mitra')}
                        >
                            Mitra Pedagang
                        </button>
                        <button
                            type="button"
                            className={`info-tab-btn ${currentTab === 'driver' ? 'active' : ''}`}
                            onClick={() => setCurrentTab('driver')}
                        >
                            Mitra Driver
                        </button>
                        <button
                            type="button"
                            className={`info-tab-btn ${currentTab === 'komunitas' ? 'active' : ''}`}
                            onClick={() => setCurrentTab('komunitas')}
                        >
                            Pengelolaan Komunitas
                        </button>
                    </div>

                    {/* Dynamic Content */}
                    <div>
                        {groups.map((group) => {
                            const visibleItems = showAllFeatures
                                ? group.items
                                : group.items.filter((item) => !item.extra);

                            return (
                                <div className="info-category-group" key={group.category}>
                                    <div>
                                        <h3 className="info-category-title">{group.category}</h3>
                                        <p className="info-category-desc">{group.desc}</p>
                                    </div>
                                    <div className="info-service-list">
                                        {visibleItems.map((item) => (
                                            <div className="info-service-item" key={item.name}>
                                                <div className={`info-service-icon-box ${item.orange ? 'orange' : ''}`}>
                                                    {item.icon}
                                                </div>
                                                <div className="info-service-info">
                                                    <div className="info-service-header">
                                                        <span className="info-service-name">{item.name}</span>
                                                        <span className={`info-tag-pill ${item.orange ? 'orange' : ''}`}>
                                                            {item.badge}
                                                        </span>
                                                    </div>
                                                    <p className="info-service-text">{item.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="info-toggle-more-wrap">
                        <button
                            type="button"
                            className="info-btn-toggle-more"
                            onClick={() => setShowAllFeatures((prev) => !prev)}
                        >
                            {showAllFeatures
                                ? 'Sembunyikan sebagian fitur ↑'
                                : 'Tampilkan semua fitur unggulan ↓'}
                        </button>
                    </div>
                </div>
            </section>

            {/* PILAR KEDAULATAN & KEADILAN */}
            <section id="pilar-kedaulatan" className="info-sovereignty-banner">
                <div className="info-container">
                    <h2 className="info-section-heading" style={{ marginBottom: '10px' }}>
                        Mengapa PasarHub Hadir untuk Kemandirian Ekonomi Bangsa?
                    </h2>
                    <p style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '720px' }}>
                        Menjaga agar perputaran uang belanja harian masyarakat tetap tinggal di lingkungan warga setempat, bukan tersedot oleh biaya komisi aplikasi asing.
                    </p>

                    <div className="info-sovereignty-grid">
                        <div className="info-pillar-card">
                            <div className="info-pillar-card-top">
                                <span className="info-pillar-metric">100%</span>
                                <span className="info-tag-pill">Hak Pedagang</span>
                            </div>
                            <h3 className="info-pillar-title">Kemandirian Marketplace Milik Bangsa</h3>
                            <p className="info-pillar-desc">
                                Didesain sebagai infrastruktur digital independen milik paguyuban pasar. Pedagang menerima hasil penjualan secara utuh tanpa potongan komisi 15–30% yang mencekik margin UMKM.
                            </p>
                        </div>

                        <div className="info-pillar-card">
                            <div className="info-pillar-card-top">
                                <span className="info-pillar-metric orange">Adil</span>
                                <span className="info-tag-pill orange">Kesejahteraan Kurir</span>
                            </div>
                            <h3 className="info-pillar-title">Keadilan Upah &amp; Efisiensi Driver Lokal</h3>
                            <p className="info-pillar-desc">
                                Memberdayakan pemuda dan warga sekitar pasar sebagai kurir resmi. Paket dari berbagai lapak sudah disatukan di titik Hub sehingga kurir tidak membuang waktu berkeliling pasar dan menerima upah antar secara adil.
                            </p>
                        </div>

                        <div className="info-pillar-card">
                            <div className="info-pillar-card-top">
                                <span className="info-pillar-metric">Escrow</span>
                                <span className="info-tag-pill">Perlindungan Ganda</span>
                            </div>
                            <h3 className="info-pillar-title">Transaksi Aman dengan Smart Escrow</h3>
                            <p className="info-pillar-desc">
                                Sistem rekening bersama menahan dana pembayaran QRIS pembeli hingga pesanan tiba lengkap dan terverifikasi. Melindungi pembeli dari barang tidak sesuai sekaligus menjamin kepastian bayar bagi pedagang.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}