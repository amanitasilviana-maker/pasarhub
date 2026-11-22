import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  Sparkles, 
  Store, 
  Plus, 
  Minus, 
  Star, 
  ShieldCheck, 
  ChevronRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';

export default function Catalog({ 
  products, 
  cart, 
  onAddToCart, 
  onRemoveFromCart, 
  onOpenCart,
  onOpenTour
}) {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search & category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchCategory = selectedCategory === 'semua' || product.kategori.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch = product.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.pedagang.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="catalog-container">
      {/* Hyperlocal Location & SLA Bar */}
      <div className="location-card">
        <div className="location-content">
          <div className="loc-icon-bubble">
            <MapPin size={18} />
          </div>
          <div className="location-text">
            <h3>Pasar Tradisional Sentral • Kawasan Kampus & Industri</h3>
            <p>Pengiriman hiperlokal terkoordinasi melalui Hub Logistik Pasar Utama</p>
          </div>
        </div>
        <div className="sla-badge">
          <Clock size={13} />
          <span>SLA &lt;90 Menit</span>
        </div>
      </div>

      {/* Hero Promotion Banner */}
      <div className="hero-card">
        <div className="hero-tag">
          <Sparkles size={12} />
          <span>Solusi Belanja Hiperlokal Mandiri</span>
        </div>
        <h2 className="hero-title">
          Belanja dari Banyak Lapak Pasar,<br />
          Ongkir Cuma Sekali (Flat Rp 5.000)!
        </h2>
        <p className="hero-subtitle">
          Sistem konsolidasi Hub-and-Spoke memungkinkan Anda menggabungkan sayur, daging, bumbu, dan ikan dalam 1 keranjang tanpa biaya berulang. 100% bebas potongan komisi untuk pedagang lokal!
        </p>

        <div className="hero-stats-row">
          <div className="hero-stat-pill">
            <Store size={14} />
            <span>Katalog Gabungan Multi-Pedagang</span>
          </div>
          <div className="hero-stat-pill">
            <ShieldCheck size={14} />
            <span>Garansi Rekening Bersama Escrow</span>
          </div>
          <div className="hero-stat-pill">
            <Tag size={14} />
            <span>Harga Transparan Langsung Lapak</span>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="search-container">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Cari daging sapi, sayur bayam, bumbu rendang, seafood..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="category-strip" role="tablist">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Section Header */}
      <div className="section-header">
        <h2>
          <span>Katalog Produk Pasar</span>
          <span style={{ fontSize: '13px', color: '#00AA13', fontWeight: 600 }}>
            ({filteredProducts.length} produk segar tersedia)
          </span>
        </h2>
        {cart.length > 0 && (
          <button 
            onClick={onOpenCart}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#00AA13', 
              fontSize: '13px', 
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Lihat Keranjang <ChevronRight size={14} />
          </button>
        )}
      </div>

      {/* Product Cards Grid */}
      <div className="product-grid">
        {filteredProducts.map(product => {
          const cartItem = cart.find(item => item.id === product.id);
          const currentQty = cartItem ? cartItem.qty : 0;

          return (
            <div key={product.id} className="product-card">
              <div className="product-card-top">
                <div 
                  className="product-icon-wrap" 
                  style={{ backgroundColor: product.warnaBg || '#F3F4F6' }}
                >
                  <span>{product.icon}</span>
                </div>
                
                <div className="product-details">
                  <div className="merchant-badge">
                    <Store size={10} />
                    <span>{product.pedagang}</span>
                  </div>

                  <h3 className="product-title">{product.nama}</h3>
                  <p className="product-desc">{product.deskripsi}</p>
                  
                  <div className="product-meta">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#D97706', fontWeight: 600 }}>
                      <Star size={11} fill="#D97706" /> {product.rating}
                    </span>
                    <span>•</span>
                    <span>{product.satuan}</span>
                    <span>•</span>
                    <span style={{ color: '#16A34A', fontWeight: 600 }}>{product.badge}</span>
                  </div>
                </div>
              </div>

              <div className="product-card-bottom">
                <div className="price-box">
                  <span className="price-label">Harga Bersih</span>
                  <span className="price-value">Rp {product.harga.toLocaleString('id-ID')}</span>
                </div>

                {currentQty === 0 ? (
                  <button 
                    className="add-btn" 
                    onClick={() => onAddToCart(product)}
                    aria-label={`Tambah ${product.nama}`}
                  >
                    <Plus size={14} /> Tambah
                  </button>
                ) : (
                  <div className="qty-counter">
                    <button 
                      className="qty-btn" 
                      onClick={() => onRemoveFromCart(product.id)}
                      aria-label="Kurangi jumlah"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="qty-value">{currentQty}</span>
                    <button 
                      className="qty-btn" 
                      onClick={() => onAddToCart(product)}
                      aria-label="Tambah jumlah"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '50px 20px', background: 'white', borderRadius: '16px', marginTop: '20px' }}>
          <p style={{ fontSize: '15px', color: '#6B7280' }}>
            Tidak ada produk yang cocok dengan pencarian "<strong>{searchQuery}</strong>".
          </p>
          <button 
            className="add-btn" 
            style={{ margin: '14px auto 0 auto' }}
            onClick={() => { setSearchQuery(''); setSelectedCategory('semua'); }}
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}
