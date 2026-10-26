import React from 'react';
import { 
  Store, 
  ShoppingBag, 
  MapPin, 
  Compass,
  LogIn,
  LogOut,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ConsumerNavbar({ 
  cartCount, 
  onOpenCart, 
  ordersCount, 
  onOpenTracking,
  currentUser,
  onLogout
}) {
  return (
    <header className="role-nav-container">
      <div className="role-nav">
        {/* Brand */}
        <Link to="/" style={{ textDecoration: 'none' }} className="brand-section">
          <div className="brand-logo-icon">
            <Store size={22} />
          </div>
          <div className="brand-text">
            <h1>PasarHub</h1>
            <span>Belanja Pasar Tradisional</span>
          </div>
        </Link>

        {/* Hyperlocal Destination Info */}
        <div className="navbar-location-badge">
          <MapPin size={14} style={{ color: '#E52727' }} />
          <span>Pengiriman ke: <strong>Kawasan Kampus &amp; Industri</strong></span>
        </div>

        {/* Actions khusus Konsumen */}
        <div className="header-actions">
          {ordersCount > 0 && (
            <button 
              className="role-pill-btn" 
              style={{ background: '#E0F2FE', color: '#0369A1', fontWeight: 700 }}
              onClick={onOpenTracking}
              title="Lacak Pesanan Aktif"
            >
              <Compass size={15} />
              <span>Status Pesanan ({ordersCount})</span>
            </button>
          )}

          <button 
            className="role-pill-btn" 
            style={{ background: '#00AA13', color: 'white', fontWeight: 700, boxShadow: '0 2px 8px rgba(0, 170, 19, 0.25)' }}
            onClick={onOpenCart}
          >
            <ShoppingBag size={15} />
            <span>Keranjang ({cartCount})</span>
          </button>

          {/* Tombol Login / Info Akun di Pojok Kanan Atas */}
          {currentUser ? (
            <div className="auth-nav-pill">
              <span className="auth-nav-avatar">{currentUser.avatar || '👤'}</span>
              <span className="auth-nav-name">{currentUser.nama}</span>
              <button 
                className="auth-logout-btn" 
                onClick={onLogout}
                title="Keluar dari akun konsumen"
              >
                <LogOut size={12} /> Keluar
              </button>
            </div>
          ) : (
            <Link to="/login-user" className="login-nav-btn">
              <LogIn size={14} />
              <span>Masuk Akun</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
