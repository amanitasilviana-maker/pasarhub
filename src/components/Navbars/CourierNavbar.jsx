import React from 'react';
import { 
  Truck, 
  MapPin, 
  LogIn,
  LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CourierNavbar({ 
  selectedCourierId, 
  setSelectedCourierId, 
  couriers,
  currentDriver,
  onLogout 
}) {
  const activeCourier = couriers.find(c => c.id === selectedCourierId) || couriers[0];

  return (
    <header className="role-nav-container" style={{ borderBottomColor: '#BAE6FD' }}>
      <div className="role-nav">
        {/* Brand khusus Driver */}
        <Link to="/driver" style={{ textDecoration: 'none' }} className="brand-section">
          <div className="brand-logo-icon" style={{ background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' }}>
            <Truck size={22} />
          </div>
          <div className="brand-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h1>PasarHub</h1>
              <span style={{ background: '#E0F2FE', color: '#0369A1', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>
                PORTAL DRIVER KURIR
              </span>
            </div>
            <span style={{ color: '#0284C7' }}>Armada Logistik Hiperlokal</span>
          </div>
        </Link>

        {/* Courier Profile Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#4B5563' }}>Kurir:</span>
          <select 
            value={selectedCourierId}
            onChange={(e) => setSelectedCourierId(e.target.value)}
            style={{ 
              padding: '6px 12px', 
              borderRadius: '8px', 
              border: '1.5px solid #7DD3FC', 
              fontSize: '13px', 
              fontWeight: 700,
              background: '#F0F9FF',
              color: '#0369A1',
              cursor: 'pointer'
            }}
          >
            {couriers.map(c => (
              <option key={c.id} value={c.id}>
                {c.avatar} {c.nama} ({c.nomorInduk})
              </option>
            ))}
          </select>
        </div>

        {/* Status Hub info & Login Button */}
        <div className="header-actions">
          <div className="navbar-location-badge" style={{ background: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0' }}>
            <MapPin size={13} style={{ color: '#16A34A' }} />
            <span>Titik Ambil: <strong>Meja Hub Gate 2</strong></span>
          </div>

          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#E0F2FE', color: '#0369A1', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, border: '1px solid #BAE6FD' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0284C7' }}></span>
            Online
          </span>

          {/* Tombol Login / Info Akun di Pojok Kanan Atas */}
          {currentDriver ? (
            <div className="auth-nav-pill">
              <span className="auth-nav-avatar" style={{ background: '#E0F2FE', color: '#0284C7' }}>
                {currentDriver.avatar || '🛵'}
              </span>
              <span className="auth-nav-name">{currentDriver.nama}</span>
              <button 
                className="auth-logout-btn" 
                onClick={onLogout}
                title="Keluar dari akun driver"
              >
                <LogOut size={12} /> Keluar
              </button>
            </div>
          ) : (
            <Link to="/login-driver" className="login-nav-btn" style={{ background: '#0284C7' }}>
              <LogIn size={14} />
              <span>Login Driver</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
