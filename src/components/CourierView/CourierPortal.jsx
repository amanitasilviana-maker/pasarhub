import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Phone, 
  CheckCircle2, 
  Package, 
  Clock, 
  Compass, 
  MessageCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export default function CourierPortal({ 
  couriers, 
  orders, 
  onUpdateOrderStatus,
  selectedCourierId: propSelectedCourierId,
  setSelectedCourierId: propSetSelectedCourierId,
  currentDriver
}) {
  const navigate = useNavigate();
  const [internalCourierId, setInternalCourierId] = useState(couriers[0].id);
  const [loginAlert, setLoginAlert] = useState("");
  const selectedCourierId = propSelectedCourierId || internalCourierId;
  const setSelectedCourierId = propSetSelectedCourierId || setInternalCourierId;

  const activeCourier = couriers.find(c => c.id === selectedCourierId) || couriers[0];

  // Orders assigned to this courier or ready for pickup
  const assignedOrders = orders.filter(o => 
    o.kurirTerkait && (o.kurirTerkait.includes(activeCourier.nama) || o.kurirTerkait.includes(activeCourier.nomorInduk))
  );

  const handleActionWithAuth = (actionCallback) => {
    if (!currentDriver) {
      setLoginAlert("⚠️ Anda wajib Login sebagai Driver Kurir terlebih dahulu untuk menjalankan pengantaran paket.");
      return;
    }
    setLoginAlert("");
    actionCallback();
  };

  return (
    <div className="courier-portal-container">
      {/* Login Warning Banner if not authenticated */}
      {!currentDriver && (
        <div style={{ background: '#FEF2F2', border: '1.5px solid #F87171', borderRadius: '12px', padding: '14px 18px', marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#991B1B' }}>
              🔒 Mode Pratinjau — Anda Belum Login sebagai Driver
            </div>
            <div style={{ fontSize: '12px', color: '#B91C1C', marginTop: '2px' }}>
              Silakan login untuk mengambil paket konsolidasi di Hub dan menjalankan pengantaran.
            </div>
          </div>
          <button 
            style={{ background: '#0284C7', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '50px', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}
            onClick={() => navigate('/login-driver')}
          >
            Login Driver Sekarang
          </button>
        </div>
      )}

      {loginAlert && (
        <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', color: '#92400E', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', marginBottom: '14px', fontWeight: 600 }}>
          {loginAlert}
        </div>
      )}
      {/* Courier Selector Tabs */}
      <div style={{ background: 'white', padding: '12px 16px', borderRadius: '16px', marginBottom: '18px', border: '1px solid #E5E9EF', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280', whiteSpace: 'nowrap' }}>
          Pilih Profil Kurir:
        </span>
        {couriers.map(c => (
          <button
            key={c.id}
            className={`role-pill-btn ${activeCourier.id === c.id ? 'active' : ''}`}
            onClick={() => setSelectedCourierId(c.id)}
            style={{ fontSize: '12px' }}
          >
            <span>{c.avatar} {c.nama} ({c.nomorInduk})</span>
          </button>
        ))}
      </div>

      {/* Courier Profile & Logistics Hub Summary */}
      <div className="merchant-header-card">
        <div className="merchant-profile-info">
          <div className="merchant-avatar" style={{ background: '#E0F2FE' }}>
            <Truck size={28} style={{ color: '#0284C7' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#111827' }}>
                {activeCourier.nama}
              </h2>
              <span style={{ background: '#DCFCE7', color: '#15803D', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px' }}>
                {activeCourier.status}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
              Kendaraan: <strong>{activeCourier.kendaraan}</strong> • Rating: ⭐ {activeCourier.rating} ({activeCourier.totalPengantaran} trip sukses)
            </div>
          </div>
        </div>

        {/* Clear Hub Pickup Point (PRD Requirement) */}
        <div style={{ background: '#F0FDF4', border: '1.5px solid #86EFAC', borderRadius: '12px', padding: '10px 14px', maxWidth: '340px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#166534', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} /> Titik Kumpul Tunggal (Hub Logistik):
          </div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#14532D', marginTop: '2px' }}>
            Meja Konsolidasi Gate 2, Pasar Sentral
          </div>
          <div style={{ fontSize: '11px', color: '#15803D' }}>
            ✓ Tidak perlu keliling ke lapak. Ambil langsung seluruh pesanan di sini!
          </div>
        </div>
      </div>

      {/* Local Routing Map Simulation */}
      <div className="courier-map-sim">
        <div className="map-grid-overlay" />
        <div className="hub-pin">
          <MapPin size={14} /> Hub Pasar (Titik Ambil)
        </div>
        <div className="route-line" />
        <div className="dest-pin">
          <Navigation size={14} /> Lokasi Konsumen (Tujuan)
        </div>
        <div style={{ position: 'absolute', bottom: '12px', left: '16px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, color: '#1F2937', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
          📍 Radius Hiperlokal: 1.8 KM • Estimasi Rute: 12 Menit
        </div>
      </div>

      {/* Assigned Deliveries */}
      <div className="section-header">
        <h2>
          <Package size={20} style={{ color: '#00AA13' }} />
          <span>Tugas Pengantaran Paket Konsolidasi</span>
        </h2>
        <span style={{ fontSize: '12px', color: '#6B7280' }}>
          {assignedOrders.length} Paket Ditugaskan
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {assignedOrders.length === 0 ? (
          <div style={{ background: 'white', padding: '40px 20px', borderRadius: '16px', textAlign: 'center', border: '1px solid #E5E7EB' }}>
            <Truck size={40} style={{ color: '#D1D5DB', margin: '0 auto 12px auto' }} />
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
              Belum Ada Paket untuk Diantar
            </h4>
            <p style={{ fontSize: '13px', color: '#6B7280' }}>
              Pesanan konsumen akan otomatis muncul di sini setelah Admin Hub menyelesaikan verifikasi konsolidasi barang.
            </p>
          </div>
        ) : (
          assignedOrders.map(order => {
            const isCompleted = order.tahapStatus === 'selesai';
            const isDelivering = order.tahapStatus === 'sedang_diantar';

            return (
              <div 
                key={order.idInduk}
                style={{ 
                  background: 'white', 
                  borderRadius: '16px', 
                  padding: '20px', 
                  border: '1.5px solid #E5E9EF',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#111827', fontFamily: 'monospace' }}>
                      {order.idInduk}
                    </span>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#1F2937', marginTop: '2px' }}>
                      {order.konsumen.nama}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>
                      Alamat: <strong>{order.konsumen.alamat}</strong>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: 800, 
                      padding: '4px 12px', 
                      borderRadius: '20px',
                      background: isCompleted ? '#DCFCE7' : isDelivering ? '#FEF3C7' : '#E0F2FE',
                      color: isCompleted ? '#15803D' : isDelivering ? '#B45309' : '#0369A1'
                    }}>
                      {isCompleted ? "✓ Selesai Terkirim" : isDelivering ? "🚚 Sedang Mengantar" : "📦 Siap Ambil di Hub"}
                    </span>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#00AA13', marginTop: '4px' }}>
                      Ongkir: Rp {order.ongkirFlat.toLocaleString('id-ID')} (Flat)
                    </div>
                  </div>
                </div>

                {/* Package Consolidation Details */}
                <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '12px', marginBottom: '14px', border: '1px solid #EEF2F6' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Isi Paket Konsolidasi ({order.subOrders.length} Lapak Digabung Jadi 1):
                  </div>
                  {order.subOrders.map(sub => (
                    <div key={sub.idSub} style={{ fontSize: '12px', color: '#334155', padding: '2px 0' }}>
                      • <strong>{sub.pedagang}:</strong> {sub.items.map(it => it.nama).join(', ')}
                    </div>
                  ))}
                </div>

                {/* Consumer contact & Actions */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a 
                    href={`https://wa.me/6281299887766?text=Halo%20${encodeURIComponent(order.konsumen.nama)},%20saya%20kurir%20PasarHub%20sedang%20mengantar%20pesanan%20Anda.`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ 
                      background: '#E8F5E9', 
                      color: '#00AA13', 
                      border: '1px solid #A7F3D0',
                      padding: '10px 16px', 
                      borderRadius: '10px', 
                      fontSize: '12px', 
                      fontWeight: 700, 
                      textDecoration: 'none',
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px' 
                    }}
                  >
                    <MessageCircle size={15} /> Hubungi via WhatsApp
                  </a>

                  {!isDelivering && !isCompleted && (
                    <button
                      className="add-btn"
                      style={{ flex: 1, justifyContent: 'center' }}
                      onClick={() => handleActionWithAuth(() => onUpdateOrderStatus(order.idInduk, 'sedang_diantar'))}
                    >
                      <Truck size={15} /> Ambil Paket dari Hub &amp; Mulai Antar
                    </button>
                  )}

                  {isDelivering && !isCompleted && (
                    <button
                      className="add-btn"
                      style={{ flex: 1, justifyContent: 'center', background: '#00AED6' }}
                      onClick={() => handleActionWithAuth(() => onUpdateOrderStatus(order.idInduk, 'selesai'))}
                    >
                      <CheckCircle2 size={15} /> Konfirmasi Paket Tiba di Lokasi Konsumen
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
