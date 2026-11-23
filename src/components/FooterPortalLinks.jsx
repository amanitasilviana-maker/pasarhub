import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Info/info.css';

export default function FooterPortalLinks() {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="info-scope">
      <footer className="info-footer">
        <div className="info-container">
          {/* IDENTITAS BRAND & NAVIGASI PANDUAN EKOSISTEM */}
          <div className="info-footer-main">
            <div className="info-footer-brand-col">
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

              <p className="info-footer-brand-desc">
                <strong>Alamat Pengembangan &amp; Operasional:</strong>
                <br />
                Ekosistem Digitalisasi Pasar Tradisional Indonesia
                <br />
                Kota Malang, Jawa Timur, Indonesia
              </p>

              <div style={{ marginTop: '16px' }}>
                <Link to="/" className="info-btn-visit" style={{ fontSize: '13px', padding: '10px 18px' }}>
                  Kunjungi Situs PasarHub &rarr;
                </Link>
              </div>
            </div>

            <div className="info-footer-nav-col">
              <div className="info-footer-col-title">Informasi &amp; Panduan Ekosistem</div>
              <nav className="info-footer-links-row">
                <Link to="/informasi">Tentang Kami</Link>
                <Link to="/panduan-mitra">Panduan Mitra</Link>
                <Link to="/panduan-driver">Panduan Driver</Link>
                <Link to="/informasi">Pusat Bantuan</Link>
                <Link to="/informasi">Kontak Kami</Link>
              </nav>
              <p className="info-footer-nav-desc">
                Pelajari alur pendaftaran lapak pedagang, verifikasi kurir lokal, mekanisme Smart Escrow, dan tata kelola mandiri paguyuban pasar melalui halaman dokumentasi kami.
              </p>
            </div>
          </div>
        </div>

        <div className="info-footer-bottom">
          <div className="info-container info-footer-bottom-inner">
            <span>Manajemen Inovasi G3 Tahun 2026 Kelompok 5</span>
            <span>&copy; 2026 PasarHub &mdash; Belanja Pasar Tradisional</span>
          </div>
        </div>
      </footer>
    </div>
  );
}