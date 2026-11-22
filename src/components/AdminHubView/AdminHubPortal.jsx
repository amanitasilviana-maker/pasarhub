import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BarChart3, 
  PackageCheck, 
  Users, 
  TrendingUp, 
  Clock, 
  QrCode, 
  AlertCircle,
  Truck,
  CheckCircle2,
  CheckSquare,
  Square,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Wallet
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminHubPortal({ 
  orders, 
  merchants, 
  couriers, 
  onConsolidateOrder, 
  onAssignCourier,
  currentAdmin
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('konsolidasi'); // 'konsolidasi', 'analitik', 'dispute', 'kurir'
  const [selectedCourierMap, setSelectedCourierMap] = useState({});
  const [loginAlert, setLoginAlert] = useState("");

  // Calculate Metrics from PRD
  const totalDailyTransactions = 542 + orders.length;
  const qrisAdoptionRate = 86.8; // Target >80%
  const averageSLA = 44; // Target <90 mins

  // Escrow ledger
  const totalEscrowHolding = orders
    .filter(o => o.tahapStatus !== 'selesai' && !o.statusEscrow.includes('100%'))
    .reduce((sum, o) => sum + o.totalBayar, 0);

  const totalDisbursed = orders
    .filter(o => o.tahapStatus === 'selesai' || o.statusEscrow.includes('100%'))
    .reduce((sum, o) => sum + o.totalBarang, 0) + 18450000;

  const handleCourierChange = (idInduk, courierName) => {
    setSelectedCourierMap(prev => ({ ...prev, [idInduk]: courierName }));
  };

  const handleConsolidateAndAssign = (order) => {
    if (!currentAdmin) {
      setLoginAlert("⚠️ Anda wajib Login sebagai Admin Paguyuban terlebih dahulu untuk mengonsolidasi paket dan menugaskan kurir.");
      return;
    }
    setLoginAlert("");
    const courier = selectedCourierMap[order.idInduk] || couriers[0].nama;
    onConsolidateOrder(order.idInduk, courier);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="admin-portal-container">
      {/* Login Warning Banner if not authenticated */}
      {!currentAdmin && (
        <div style={{ background: '#FEF2F2', border: '1.5px solid #F87171', borderRadius: '12px', padding: '14px 18px', marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#991B1B' }}>
              🔒 Mode Pratinjau — Anda Belum Login sebagai Admin Paguyuban
            </div>
            <div style={{ fontSize: '12px', color: '#B91C1C', marginTop: '2px' }}>
              Silakan login untuk memverifikasi konsolidasi barang dan menugaskan armada kurir.
            </div>
          </div>
          <button 
            style={{ background: '#1E293B', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '50px', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}
            onClick={() => navigate('/login-admin')}
          >
            Login Admin Sekarang
          </button>
        </div>
      )}

      {loginAlert && (
        <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', color: '#92400E', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', marginBottom: '14px', fontWeight: 600 }}>
          {loginAlert}
        </div>
      )}
      {/* Top Header & Tab Navigation */}
      <div style={{ background: 'white', padding: '16px 20px', borderRadius: '16px', marginBottom: '20px', border: '1px solid #E5E9EF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#111827' }}>
              Pusat Kendali Paguyuban &amp; Hub Logistik
            </h2>
            <span style={{ background: '#DCFCE7', color: '#15803D', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px' }}>
              Koperasi Otonom
            </span>
          </div>
          <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
            Pasar Tradisional Sentral • Penyelenggara: Paguyuban Mitra Pasar Mandiri
          </div>
        </div>

        {/* Tab Pills */}
        <div style={{ display: 'flex', gap: '6px', background: '#F1F5F9', padding: '4px', borderRadius: '50px' }}>
          <button
            className={`role-pill-btn ${activeTab === 'konsolidasi' ? 'active' : ''}`}
            onClick={() => setActiveTab('konsolidasi')}
            style={{ fontSize: '12px' }}
          >
            <PackageCheck size={14} />
            <span>Stasiun Konsolidasi Hub</span>
          </button>

          <button
            className={`role-pill-btn ${activeTab === 'analitik' ? 'active' : ''}`}
            onClick={() => setActiveTab('analitik')}
            style={{ fontSize: '12px' }}
          >
            <BarChart3 size={14} />
            <span>Metrik &amp; Arus Kas Escrow</span>
          </button>

          <button
            className={`role-pill-btn ${activeTab === 'kurir' ? 'active' : ''}`}
            onClick={() => setActiveTab('kurir')}
            style={{ fontSize: '12px' }}
          >
            <Truck size={14} />
            <span>Armada Kurir ({couriers.length})</span>
          </button>

          <button
            className={`role-pill-btn ${activeTab === 'dispute' ? 'active' : ''}`}
            onClick={() => setActiveTab('dispute')}
            style={{ fontSize: '12px' }}
          >
            <AlertCircle size={14} />
            <span>Resolusi Sengketa (Dispute)</span>
          </button>
        </div>
      </div>

      {/* METRICS ROW (PRD Success Metrics) */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>Target Transaksi Harian</span>
            <div className="stat-icon" style={{ background: '#E0F2FE', color: '#0284C7' }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="stat-val">{totalDailyTransactions}</div>
          <div className="stat-sub" style={{ color: '#16A34A', fontWeight: 600 }}>
            ✓ Melampaui target minimum PRD (&gt;500/hari)
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>Adopsi QRIS / E-Wallet</span>
            <div className="stat-icon" style={{ background: '#FEE2E2', color: '#DC2626' }}>
              <QrCode size={20} />
            </div>
          </div>
          <div className="stat-val">{qrisAdoptionRate}%</div>
          <div className="stat-sub" style={{ color: '#16A34A', fontWeight: 600 }}>
            ✓ Melampaui target PRD (&gt;80% digital)
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>SLA Rata-Rata Logistik</span>
            <div className="stat-icon" style={{ background: '#DCFCE7', color: '#16A34A' }}>
              <Clock size={20} />
            </div>
          </div>
          <div className="stat-val">{averageSLA} Menit</div>
          <div className="stat-sub" style={{ color: '#16A34A', fontWeight: 600 }}>
            ✓ SLA Sangat Cepat (Target &lt;90 Menit)
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>Dana Escrow Aktif</span>
            <div className="stat-icon" style={{ background: '#FEF9C3', color: '#B45309' }}>
              <ShieldCheck size={20} />
            </div>
          </div>
          <div className="stat-val">Rp {totalEscrowHolding.toLocaleString('id-ID')}</div>
          <div className="stat-sub" style={{ color: '#0284C7', fontWeight: 600 }}>
            🔒 Tertahan aman di Rekening Bersama
          </div>
        </div>
      </div>

      {/* TAB 1: STASIUN KONSOLIDASI HUB */}
      {activeTab === 'konsolidasi' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="section-header">
            <h2>
              <PackageCheck size={20} style={{ color: '#00AA13' }} />
              <span>Verifikasi Konsolidasi Barang Antar Lapak (Hub Consolidation)</span>
            </h2>
            <span style={{ fontSize: '12px', color: '#6B7280' }}>
              Titik Kumpul: Meja Pengepakan Gate 2
            </span>
          </div>

          {orders.map(order => {
            const isFullyConsolidated = order.subOrders.every(s => s.statusLapak.includes('Sudah'));
            const isDispatched = order.tahapStatus === 'sedang_diantar' || order.tahapStatus === 'selesai';

            return (
              <div key={order.idInduk} className="consolidation-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 800, fontFamily: 'monospace', color: '#111827' }}>
                        {order.idInduk}
                      </span>
                      <span style={{ fontSize: '11px', background: '#F1F5F9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                        {order.metodeKirim}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B', marginTop: '4px' }}>
                      Penerima: {order.konsumen.nama} ({order.konsumen.alamat})
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: 800, 
                      padding: '4px 10px', 
                      borderRadius: '20px',
                      background: isDispatched ? '#DCFCE7' : isFullyConsolidated ? '#FEF3C7' : '#E0F2FE',
                      color: isDispatched ? '#15803D' : isFullyConsolidated ? '#B45309' : '#0369A1'
                    }}>
                      {isDispatched ? "✓ Paket Sudah Diberikan ke Kurir" : isFullyConsolidated ? "✓ Seluruh Lapak Lengkap di Hub" : "Menunggu Lapak Menyerahkan Barang"}
                    </span>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#00AA13', marginTop: '4px' }}>
                      Total: Rp {order.totalBayar.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>

                {/* Sub-orders Checklist inside Hub */}
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>
                    Checklist Penerimaan Barang dari Masing-Masing Lapak Pedagang:
                  </div>
                  {order.subOrders.map(sub => {
                    const isArrived = sub.statusLapak.includes('Sudah');
                    return (
                      <div key={sub.idSub} className="lapak-checklist-item">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {isArrived ? (
                            <CheckSquare size={18} style={{ color: '#16A34A' }} />
                          ) : (
                            <Square size={18} style={{ color: '#94A3B8' }} />
                          )}
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B' }}>
                              {sub.pedagang}
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748B' }}>
                              Barang: {sub.items.map(it => `${it.qty || 1}x ${it.nama}`).join(', ')}
                            </div>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span style={{ 
                            fontSize: '11px', 
                            fontWeight: 700, 
                            color: isArrived ? '#16A34A' : '#D97706',
                            background: isArrived ? '#DCFCE7' : '#FEF3C7',
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            {isArrived ? "Sudah di Meja Hub" : "Dalam Pengantaran Lapak"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Courier Assignment & Action */}
                {!isDispatched ? (
                  <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '14px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Truck size={18} style={{ color: '#00AED6' }} />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                        Pilih Kurir Internal Pasar:
                      </span>
                      <select 
                        style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', fontWeight: 600 }}
                        value={selectedCourierMap[order.idInduk] || couriers[0].nama}
                        onChange={(e) => handleCourierChange(order.idInduk, e.target.value)}
                      >
                        {couriers.map(c => (
                          <option key={c.id} value={`${c.nama} (${c.nomorInduk})`}>
                            {c.nama} - {c.kendaraan}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      className="add-btn"
                      style={{ 
                        background: '#00AA13',
                        opacity: isFullyConsolidated ? 1 : 0.8
                      }}
                      onClick={() => handleConsolidateAndAssign(order)}
                    >
                      <PackageCheck size={16} />
                      <span>Satukan Jadi 1 Paket &amp; Tugaskan Kurir</span>
                    </button>
                  </div>
                ) : (
                  <div style={{ background: '#F0FDF4', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', color: '#166534', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>✓ Paket telah terkonsolidasi utuh dan diserahkan kepada armada {order.kurirTerkait}.</span>
                    <span style={{ fontWeight: 800 }}>Status: Siap Diantar</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: ANALITIK & ARUS KAS ESCROW */}
      {activeTab === 'analitik' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Smart Escrow Transparency Card */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1.5px solid #E5E9EF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wallet size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111827' }}>
                  Buku Kas Rekening Bersama (Smart Escrow Ledger)
                </h3>
                <p style={{ fontSize: '12px', color: '#6B7280' }}>
                  Model Otonom Koperasi Paguyuban: 100% dana langsung ke pedagang tanpa potongan komisi
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 700 }}>Total Dana Ditahan (Escrow Holding)</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#D97706', marginTop: '4px' }}>
                  Rp {totalEscrowHolding.toLocaleString('id-ID')}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                  Belum dicairkan sampai pembeli klik "Pesanan Diterima"
                </div>
              </div>

              <div style={{ background: '#F0FDF4', padding: '16px', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                <div style={{ fontSize: '12px', color: '#166534', fontWeight: 700 }}>Total Dana Berhasil Dicairkan ke UMKM</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#15803D', marginTop: '4px' }}>
                  Rp {totalDisbursed.toLocaleString('id-ID')}
                </div>
                <div style={{ fontSize: '11px', color: '#166534', marginTop: '4px' }}>
                  ✓ 100% Ditransfer utuh tanpa komisi potongan
                </div>
              </div>

              <div style={{ background: '#EFF6FF', padding: '16px', borderRadius: '12px', border: '1px solid #BFDBFE' }}>
                <div style={{ fontSize: '12px', color: '#1E40AF', fontWeight: 700 }}>Pendapatan Ongkir Logistik Hub</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#0284C7', marginTop: '4px' }}>
                  Rp {(orders.length * 5000 + 1250000).toLocaleString('id-ID')}
                </div>
                <div style={{ fontSize: '11px', color: '#1E40AF', marginTop: '4px' }}>
                  Digunakan untuk operasional kurir lokal pasar
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '16px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>
                Distribusi Saldo Per Lapak Mitra Paguyuban Saat Ini:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
                {Object.keys(merchants).map(name => {
                  const m = merchants[name];
                  return (
                    <div key={name} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>
                        {m.avatar} {name.split(' (')[0]}
                      </span>
                      <strong style={{ color: '#00AA13', fontSize: '13px' }}>
                        Rp {(m.saldo || 0).toLocaleString('id-ID')}
                      </strong>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ARMADA KURIR */}
      {activeTab === 'kurir' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {couriers.map(c => (
            <div key={c.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #E5E9EF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                  🛵
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#111827' }}>{c.nama}</h4>
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>
                    {c.nomorInduk} • {c.kendaraan}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '8px 0', borderTop: '1px solid #F1F5F9' }}>
                <span style={{ color: '#6B7280' }}>Status Operasional:</span>
                <span style={{ fontWeight: 700, color: '#16A34A' }}>{c.status}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '8px 0', borderTop: '1px solid #F1F5F9' }}>
                <span style={{ color: '#6B7280' }}>Lokasi Terakhir:</span>
                <span style={{ fontWeight: 600 }}>{c.lokasiSekarang}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '8px 0', borderTop: '1px solid #F1F5F9' }}>
                <span style={{ color: '#6B7280' }}>Total Pengantaran:</span>
                <span style={{ fontWeight: 700 }}>{c.totalPengantaran} trip</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: DISPUTE RESOLUTION */}
      {activeTab === 'dispute' && (
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #E5E9EF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <AlertCircle size={22} style={{ color: '#00AED6' }} />
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Penyelesaian Perselisihan (Dispute Resolution)</h3>
              <p style={{ fontSize: '12px', color: '#6B7280' }}>
                Fitur penengah oleh Paguyuban Pasar jika terjadi ketidaksesuaian barang atau kualitas produk
              </p>
            </div>
          </div>

          <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '16px', border: '1px solid #E2E8F0', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#111827' }}>Kasus #DSP-091: Cabai Kurang Segar</span>
              <span style={{ fontSize: '11px', background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>Terselesaikan</span>
            </div>
            <p style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.5 }}>
              Konsumen melaporkan 100g cabai rawit lembek. Admin Paguyuban memfasilitasi penggantian langsung dari Lapak Pak Slamet dalam waktu 15 menit melalui armada kurir internal. Escrow berhasil dicairkan setelah pembeli puas.
            </p>
          </div>

          <div style={{ background: '#F0FDF4', borderRadius: '10px', padding: '12px', fontSize: '12px', color: '#166534', fontWeight: 600 }}>
            ✓ Rekening Bersama Escrow PasarHub memastikan perlindungan ganda: Pembeli dijamin menerima barang prima, Pedagang dijamin menerima bayaran 100%.
          </div>
        </div>
      )}
    </div>
  );
}
