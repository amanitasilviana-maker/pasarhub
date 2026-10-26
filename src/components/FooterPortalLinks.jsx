import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Store, ShoppingBag, Truck, ShieldCheck, LogIn } from 'lucide-react';

export default function FooterPortalLinks() {
  const location = useLocation();

  const portals = [
    { path: '/', label: 'Halaman Konsumen', icon: ShoppingBag, desc: 'Katalog, Keranjang & Checkout' },
    { path: '/umkm', label: 'Halaman Mitra UMKM', icon: Store, desc: 'Lapak Pedagang, Pesanan & Saldo' },
    { path: '/driver', label: 'Halaman Driver Kurir', icon: Truck, desc: 'Titik Hub & Rute Pengantaran' },
    { path: '/admin', label: 'Halaman Admin Hub', icon: ShieldCheck, desc: 'Konsolidasi & Buku Kas Escrow' }
  ];

  const loginLinks = [
    { path: '/login-user', label: 'Login Konsumen', icon: LogIn, role: 'User' },
    { path: '/login-umkm', label: 'Login Mitra UMKM', icon: LogIn, role: 'Mitra' },
    { path: '/login-driver', label: 'Login Driver', icon: LogIn, role: 'Driver' },
    { path: '/login-admin', label: 'Login Admin Hub', icon: LogIn, role: 'Admin' }
  ];

  return (
    <footer className="footer-portals-section">
      <div className="footer-portals-container">
        {/* Main Portals */}
        <div className="footer-title">
          <span>Akses Portal Persona PasarHub (Sesuai Rute URL):</span>
        </div>

        <div className="portal-links-grid">
          {portals.map(p => {
            const isActive = location.pathname === p.path;
            const Icon = p.icon;

            return (
              <Link 
                key={p.path} 
                to={p.path} 
                className={`portal-link-card ${isActive ? 'active' : ''}`}
              >
                <div className="portal-link-icon">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="portal-link-name">
                    {p.label} <code style={{ fontSize: '11px', opacity: 0.8 }}>({p.path})</code>
                  </div>
                  <div className="portal-link-desc">{p.desc}</div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Login Pages Directory */}
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed #374151' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#9CA3AF', marginBottom: '10px' }}>
            Rute Halaman Login per Persona:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {loginLinks.map(l => (
              <Link
                key={l.path}
                to={l.path}
                style={{
                  background: location.pathname === l.path ? '#00AA13' : '#1F2937',
                  color: location.pathname === l.path ? 'white' : '#D1D5DB',
                  border: '1px solid #374151',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <LogIn size={11} />
                <span>{l.label}</span>
                <code style={{ opacity: 0.7 }}>({l.path})</code>
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} PasarHub — Platform Marketplace Konsolidasi Pasar Tradisional Otonom.
        </div>
      </div>
    </footer>
  );
}
