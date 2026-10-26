import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Store, 
  Truck, 
  ShieldCheck, 
  PackageCheck, 
  AlertCircle,
  PhoneCall,
  Sparkles,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderTrackingModal({ 
  isOpen, 
  onClose, 
  order, 
  onConfirmOrderReceived 
}) {
  if (!isOpen || !order) return null;

  const handleConfirmReceived = () => {
    // Fire celebratory confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    onConfirmOrderReceived(order.idInduk);
  };

  const isCompleted = order.tahapStatus === 'selesai' || order.statusEscrow.includes('100%');

  // Stages for Happy Path
  const stages = [
    {
      key: 'menunggu_bayar',
      title: '1. Pembayaran Berhasil',
      desc: `Metode ${order.metodeBayar} • Dana diamankan di Rekening Bersama Escrow PasarHub.`,
      icon: ShieldCheck
    },
    {
      key: 'diproses_pedagang',
      title: '2. Pedagang Menyiapkan & Antar ke Hub',
      desc: 'Masing-masing pedagang menerima sub-order dan mengantar barang ke titik Hub pasar.',
      icon: Store
    },
    {
      key: 'konsolidasi_hub',
      title: '3. Konsolidasi di Hub Pasar',
      desc: 'Admin Hub mengecek kelengkapan sayur, daging, dan bumbu menjadi 1 paket utuh.',
      icon: PackageCheck
    },
    {
      key: 'sedang_diantar',
      title: '4. Kurir Mengantar ke Tujuan',
      desc: `Armada kurir internal pasar (${order.kurirTerkait || 'Kurir Hub'}) dalam perjalanan.`,
      icon: Truck
    },
    {
      key: 'selesai',
      title: '5. Pesanan Diterima & Pencairan Escrow',
      desc: 'Konsumen mengonfirmasi barang diterima; dana 100% dicairkan ke pedagang tanpa potongan!',
      icon: CheckCircle2
    }
  ];

  const getStageStatus = (stageIndex) => {
    const stageOrder = ['menunggu_bayar', 'diproses_pedagang', 'konsolidasi_hub', 'sedang_diantar', 'selesai'];
    const currentIdx = stageOrder.indexOf(order.tahapStatus);

    if (stageIndex < currentIdx || isCompleted) return 'completed';
    if (stageIndex === currentIdx) return 'active';
    return 'pending';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3>
              <Clock size={20} style={{ color: '#00AA13' }} />
              <span>Lacak Status Pesanan Hiperlokal</span>
            </h3>
            <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>
              No. Transaksi Induk: <strong>{order.idInduk}</strong>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Tutup">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* SLA & Escrow Status Bar */}
          <div style={{ 
            background: isCompleted ? '#DCFCE7' : '#FEF9C3', 
            borderRadius: '12px', 
            padding: '14px', 
            border: `1.5px solid ${isCompleted ? '#86EFAC' : '#FDE047'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: isCompleted ? '#166534' : '#854D0E', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} /> Status Smart Escrow:
              </div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: isCompleted ? '#15803D' : '#A16207', marginTop: '2px' }}>
                {isCompleted ? '✓ Dana Telah Dicairkan 100% ke Pedagang' : '🔒 Dana Terkunci Aman di Escrow PasarHub'}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: '#6B7280' }}>Target SLA:</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#00AA13' }}>&lt; 90 Menit</div>
            </div>
          </div>

          {/* Delivery Address & Courier info */}
          <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <MapPin size={18} style={{ color: '#DC2626', marginTop: '2px', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1F2937' }}>Alamat Pengantaran:</div>
                <div style={{ fontSize: '13px', color: '#4B5563' }}>{order.konsumen.alamat}</div>
                <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>
                  Penerima: {order.konsumen.nama} ({order.konsumen.telp})
                </div>
              </div>
            </div>

            {order.kurirTerkait && (
              <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#1E293B', fontWeight: 600 }}>
                  <Truck size={15} style={{ color: '#00AED6' }} />
                  <span>Kurir Hub: {order.kurirTerkait}</span>
                </div>
                <span style={{ fontSize: '11px', color: '#16A34A', fontWeight: 700 }}>Armada Siap</span>
              </div>
            )}
          </div>

          {/* Happy Path Timeline */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: '8px' }}>
              Proses Perjalanan Pesanan (Hub-and-Spoke)
            </h4>
            <div className="timeline-container">
              {stages.map((stg, idx) => {
                const status = getStageStatus(idx);
                const StepIcon = stg.icon;
                return (
                  <div key={stg.key} className={`timeline-step ${status}`}>
                    <div className="timeline-dot">
                      {status === 'completed' ? '✓' : idx + 1}
                    </div>
                    <h5>{stg.title}</h5>
                    <p>{stg.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sub-orders Status per Lapak */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: '8px' }}>
              Status Sub-Order Tiap Lapak Pedagang
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {order.subOrders.map(sub => (
                <div key={sub.idSub} style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>{sub.pedagang}</div>
                    <div style={{ fontSize: '11px', color: '#6B7280' }}>
                      {sub.items.map(it => `${it.qty || 1}x ${it.nama}`).join(', ')}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: 700, 
                      padding: '3px 8px', 
                      borderRadius: '6px',
                      background: sub.statusLapak.includes('Sudah') ? '#DCFCE7' : '#FEF3C7',
                      color: sub.statusLapak.includes('Sudah') ? '#15803D' : '#B45309'
                    }}>
                      {sub.statusLapak}
                    </span>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#374151', marginTop: '2px' }}>
                      Rp {sub.totalSub.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with The Critical Action */}
        <div className="modal-footer" style={{ flexDirection: 'column', gap: '10px', alignItems: 'stretch' }}>
          {!isCompleted ? (
            <button 
              className="action-btn"
              style={{ 
                background: '#00AA13', 
                color: 'white', 
                border: 'none', 
                padding: '14px', 
                borderRadius: '50px', 
                fontWeight: 800, 
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(0, 170, 19, 0.35)'
              }}
              onClick={handleConfirmReceived}
            >
              <PackageCheck size={18} />
              <span>Konfirmasi Pesanan Diterima (Cairkan 100% Saldo Pedagang)</span>
            </button>
          ) : (
            <div style={{ textAlign: 'center', padding: '8px', color: '#15803D', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Sparkles size={16} /> Transaksi Selesai • Seluruh Pedagang Telah Menerima 100% Hak Dana
            </div>
          )}

          <div style={{ fontSize: '11px', color: '#6B7280', textAlign: 'center' }}>
            {isCompleted 
              ? 'Terima kasih telah memberdayakan UMKM pasar tradisional lokal tanpa potongan komisi!'
              : 'Klik tombol di atas setelah barang Anda terima lengkap dari kurir/hub.'}
          </div>
        </div>
      </div>
    </div>
  );
}
