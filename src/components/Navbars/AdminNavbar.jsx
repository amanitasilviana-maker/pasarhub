import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Building2,
  CheckCircle2,
  LogIn,
  LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminNavbar({ 
  currentAdmin, 
  onLogout 
}) {
  return (
    <header className="role-nav-container" style={{ borderBottomColor: '#CBD5E1' }}>
      <div className="role-nav">
        {/* Brand khusus Admin Hub */}
        <Link to="/admin" style={{ textDecoration: 'none' }} className="brand-section">
          <div className="brand-logo-icon" style={{ background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)' }}>
            <ShieldCheck size={22} />
          </div>
          <div className="brand-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h1>PasarHub</h1>
              <span style={{ background: '#F1F5F9', color: '#334155', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>
                ADMIN PAGUYUBAN PASAR
              </span>
            </div>
            <span style={{ color: '#475569' }}>Stasiun Konsolidasi &amp; Pusat Escrow</span>
          </div>
        </Link>

        {/* Info Paguyuban */}
        <div className="navbar-location-badge">
          <Building2 size={14} style={{ color: '#64748B' }} />
          <span>Pengelola: <strong>Paguyuban Koperasi Pasar Sentral</strong></span>
        </div>

        {/* Status Operasional & Tombol Login */}
        <div className="header-actions">
          <div className="navbar-location-badge" style={{ background: '#F8FAFC', color: '#475569', border: '1px solid #E2E8F0' }}>
            <Clock size={13} />
            <span>05:00 - 17:00 WIB</span>
          </div>

          {/* Tombol Login / Info Akun di Pojok Kanan Atas */}
          {currentAdmin ? (
            <div className="auth-nav-pill">
              <span className="auth-nav-avatar" style={{ background: '#F1F5F9', color: '#334155' }}>
                {currentAdmin.avatar || '🏛️'}
              </span>
              <span className="auth-nav-name">{currentAdmin.nama}</span>
              <button 
                className="auth-logout-btn" 
                onClick={onLogout}
                title="Keluar dari akun admin"
              >
                <LogOut size={12} /> Keluar
              </button>
            </div>
          ) : (
            <Link to="/login-admin" className="login-nav-btn" style={{ background: '#1E293B' }}>
              <LogIn size={14} />
              <span>Login Admin</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
