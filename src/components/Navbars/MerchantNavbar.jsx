import React from 'react';
import { 
  Store, 
  Volume2, 
  LogIn,
  LogOut,
  UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MerchantNavbar({ 
  selectedMerchant, 
  setSelectedMerchant, 
  merchants,
  onTriggerSoundAlert,
  currentMerchant,
  onLogout
}) {
  const merchantNames = Object.keys(merchants);

  return (
    <header className="role-nav-container" style={{ borderBottomColor: '#BBF7D0' }}>
      <div className="role-nav">
        {/* Brand khusus UMKM */}
        <Link to="/umkm" style={{ textDecoration: 'none' }} className="brand-section">
          <div className="brand-logo-icon" style={{ background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)' }}>
            <Store size={22} />
          </div>
          <div className="brand-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h1>PasarHub</h1>
              <span style={{ background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>
                PORTAL MITRA UMKM
              </span>
            </div>
            <span style={{ color: '#16A34A' }}>Panel Manajemen Lapak Pedagang</span>
          </div>
        </Link>

        {/* Merchant Stall Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#4B5563' }}>Lapak Aktif:</span>
          <select 
            value={selectedMerchant}
            onChange={(e) => setSelectedMerchant(e.target.value)}
            style={{ 
              padding: '6px 12px', 
              borderRadius: '8px', 
              border: '1.5px solid #86EFAC', 
              fontSize: '13px', 
              fontWeight: 700,
              background: '#F0FDF4',
              color: '#166534',
              cursor: 'pointer'
            }}
          >
            {merchantNames.map(name => (
              <option key={name} value={name}>
                {merchants[name].avatar} {name}
              </option>
            ))}
          </select>
        </div>

        {/* Actions khusus Mitra UMKM */}
        <div className="header-actions">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#F0FDF4', color: '#166534', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, border: '1px solid #BBF7D0' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16A34A' }}></span>
            Lapak Buka
          </span>

          <button 
            className="role-pill-btn"
            style={{ background: '#FEF3C7', color: '#B45309', border: '1px solid #FDE68A', fontWeight: 700 }}
            onClick={onTriggerSoundAlert}
            title="Uji coba notifikasi nyaring pesanan baru"
          >
            <Volume2 size={15} />
            <span>Tes Bel</span>
          </button>

          {/* Tombol Login / Info Akun di Pojok Kanan Atas */}
          {currentMerchant ? (
            <div className="auth-nav-pill">
              <span className="auth-nav-avatar" style={{ background: '#DCFCE7', color: '#15803D' }}>
                {currentMerchant.avatar || '🏪'}
              </span>
              <span className="auth-nav-name">{currentMerchant.nama}</span>
              <button 
                className="auth-logout-btn" 
                onClick={onLogout}
                title="Keluar dari akun mitra"
              >
                <LogOut size={12} /> Keluar
              </button>
            </div>
          ) : (
            <Link to="/login-umkm" className="login-nav-btn" style={{ background: '#16A34A' }}>
              <LogIn size={14} />
              <span>Login Mitra</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
