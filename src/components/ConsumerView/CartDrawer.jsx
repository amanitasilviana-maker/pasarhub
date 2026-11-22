import React from 'react';
import { 
  X, 
  Store, 
  Trash2, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  ArrowRight, 
  Plus, 
  Minus,
  CheckCircle2,
  Package
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  onAddToCart, 
  onRemoveFromCart, 
  onClearCart,
  onProceedToCheckout,
  deliveryMethod,
  setDeliveryMethod,
  currentUser
}) {
  const navigate = useNavigate();
  const [showLoginPrompt, setShowLoginPrompt] = React.useState(false);
  if (!isOpen) return null;

  // Group items by merchant for Order Splitting preview
  const merchantGroups = cart.reduce((acc, item) => {
    if (!acc[item.pedagang]) {
      acc[item.pedagang] = [];
    }
    acc[item.pedagang].push(item);
    return acc;
  }, {});

  const totalItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalBarang = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);
  const ongkirFlat = deliveryMethod === 'delivery' ? 5000 : 0;
  const totalBayar = totalBarang + ongkirFlat;
  const totalMerchants = Object.keys(merchantGroups).length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h3>
            <Package size={20} style={{ color: '#00AA13' }} />
            <span>Keranjang Bersama Lintas Lapak</span>
          </h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Tutup Keranjang">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 10px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🛒</div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>
                Keranjang Belanja Masih Kosong
              </h4>
              <p style={{ fontSize: '13px', color: '#6B7280', maxWidth: '320px', margin: '0 auto 16px auto' }}>
                Pilih sayur, daging, bumbu, atau seafood dari berbagai lapak pasar tradisional kami.
              </p>
              <button className="add-btn" style={{ margin: '0 auto' }} onClick={onClose}>
                Mulai Berbelanja
              </button>
            </div>
          ) : (
            <>
              {/* Smart Escrow Security Guarantee */}
              <div className="escrow-callout">
                <ShieldCheck className="escrow-callout-icon" />
                <div>
                  <h4>Keamanan Rekening Bersama (Smart Escrow)</h4>
                  <p>
                    Uang Anda disimpan aman di Escrow PasarHub. Pedagang baru menerima pembayaran <strong>100% tanpa potongan</strong> setelah Anda mengonfirmasi bahwa barang telah diterima dengan baik.
                  </p>
                </div>
              </div>

              {/* Delivery Method Selector */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                  Metode Pemenuhan (Fulfillment)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div 
                    className={`payment-card ${deliveryMethod === 'delivery' ? 'active' : ''}`}
                    onClick={() => setDeliveryMethod('delivery')}
                  >
                    <Truck size={18} style={{ color: '#00AA13' }} />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700 }}>Antar Kurir Hub</div>
                      <div style={{ fontSize: '11px', color: '#16A34A', fontWeight: 600 }}>Ongkir Flat Rp 5.000</div>
                    </div>
                  </div>

                  <div 
                    className={`payment-card ${deliveryMethod === 'pickup' ? 'active' : ''}`}
                    onClick={() => setDeliveryMethod('pickup')}
                  >
                    <MapPin size={18} style={{ color: '#00AED6' }} />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700 }}>Pick-Up di Hub</div>
                      <div style={{ fontSize: '11px', color: '#6B7280' }}>Gratis (Rp 0)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Splitting Preview Notice */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#F0FDF4', borderRadius: '8px', border: '1px solid #BBF7D0' }}>
                <span style={{ fontSize: '12px', color: '#166534', fontWeight: 600 }}>
                  ⚡ Sistem Konsolidasi: {totalMerchants} Lapak Mitra Berbeda
                </span>
                <span style={{ fontSize: '11px', background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                  1x Biaya Ongkir Flat
                </span>
              </div>

              {/* Grouped Items per Merchant */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {Object.keys(merchantGroups).map(pedagang => {
                  const items = merchantGroups[pedagang];
                  const subTotal = items.reduce((sum, it) => sum + (it.harga * it.qty), 0);

                  return (
                    <div key={pedagang} className="cart-merchant-group">
                      <div className="cart-merchant-title">
                        <h5>
                          <Store size={14} />
                          <span>{pedagang}</span>
                        </h5>
                        <span className="suborder-badge">Sub-Order Terpisah</span>
                      </div>

                      {items.map(item => (
                        <div key={item.id} className="cart-item-row">
                          <div style={{ flex: 1, paddingRight: '10px' }}>
                            <div style={{ fontWeight: 600, color: '#1F2937' }}>{item.nama}</div>
                            <div style={{ fontSize: '11px', color: '#6B7280' }}>
                              Rp {item.harga.toLocaleString('id-ID')} × {item.qty}
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div className="qty-counter" style={{ padding: '2px 4px' }}>
                              <button 
                                className="qty-btn" 
                                style={{ width: '22px', height: '22px', fontSize: '10px' }}
                                onClick={() => onRemoveFromCart(item.id)}
                              >
                                <Minus size={10} />
                              </button>
                              <span className="qty-value" style={{ fontSize: '12px', minWidth: '14px' }}>
                                {item.qty}
                              </span>
                              <button 
                                className="qty-btn" 
                                style={{ width: '22px', height: '22px', fontSize: '10px' }}
                                onClick={() => onAddToCart(item)}
                              >
                                <Plus size={10} />
                              </button>
                            </div>

                            <span style={{ fontWeight: 700, minWidth: '70px', textAlign: 'right' }}>
                              Rp {(item.harga * item.qty).toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                      ))}

                      <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#6B7280' }}>
                        <span>Penerimaan Bersih UMKM Lapak Ini:</span>
                        <strong style={{ color: '#111827' }}>Rp {subTotal.toLocaleString('id-ID')} (100%)</strong>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Breakdown */}
              <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '14px', border: '1px dashed #CBD5E1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: '#64748B' }}>Total Barang ({totalItemsCount} item):</span>
                  <span style={{ fontWeight: 600 }}>Rp {totalBarang.toLocaleString('id-ID')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: '#64748B' }}>Biaya Logistik Konsolidasi Hub:</span>
                  <span style={{ fontWeight: 600, color: ongkirFlat === 0 ? '#16A34A' : '#111827' }}>
                    {ongkirFlat === 0 ? 'GRATIS (Pick-Up)' : `Rp ${ongkirFlat.toLocaleString('id-ID')} (Flat Lintas Lapak)`}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: '#64748B' }}>Potongan Komisi Platform:</span>
                  <span style={{ fontWeight: 700, color: '#16A34A' }}>Rp 0 (0% untuk Koperasi UMKM)</span>
                </div>
                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '8px', marginTop: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                  <span style={{ fontWeight: 800 }}>Total Pembayaran:</span>
                  <span style={{ fontWeight: 800, color: '#00AA13', fontSize: '17px' }}>
                    Rp {totalBayar.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="modal-footer" style={{ flexDirection: 'column', gap: '10px', alignItems: 'stretch' }}>
            {showLoginPrompt && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#991B1B', fontWeight: 600 }}>
                  ⚠️ Anda harus login sebagai Konsumen terlebih dahulu untuk membeli.
                </span>
                <button
                  style={{ background: '#DC2626', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => {
                    onClose();
                    navigate('/login-user');
                  }}
                >
                  Login Sekarang
                </button>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button 
                onClick={onClearCart}
                style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
              >
                <Trash2 size={14} /> Kosongkan
              </button>

              <button 
                className="cart-action-btn"
                onClick={() => {
                  if (!currentUser) {
                    setShowLoginPrompt(true);
                  } else {
                    setShowLoginPrompt(false);
                    onProceedToCheckout();
                  }
                }}
              >
                <span>Lanjut Checkout</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
