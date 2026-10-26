import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  QrCode, 
  Wallet, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  Info,
  CheckCircle2,
  Smartphone
} from 'lucide-react';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cart, 
  deliveryMethod,
  onCompleteCheckout 
}) {
  if (!isOpen) return null;

  const [metodeBayar, setMetodeBayar] = useState('QRIS');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Group items by merchant for Order Splitting
  const merchantGroups = cart.reduce((acc, item) => {
    if (!acc[item.pedagang]) {
      acc[item.pedagang] = {
        pedagang: item.pedagang,
        items: [],
        totalSub: 0
      };
    }
    acc[item.pedagang].items.push({
      nama: item.nama,
      qty: item.qty,
      harga: item.harga
    });
    acc[item.pedagang].totalSub += (item.harga * item.qty);
    return acc;
  }, {});

  const totalBarang = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);
  const ongkirFlat = deliveryMethod === 'delivery' ? 5000 : 0;
  const totalBayar = totalBarang + ongkirFlat;

  const handlePay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const idTransaksiInduk = "TXH-" + Date.now().toString().slice(-8);

      // Generate sub-orders per merchant (Order Splitting Logic)
      const subOrders = Object.values(merchantGroups).map((sub, idx) => ({
        idSub: `SUB-${idTransaksiInduk}-${String.fromCharCode(65 + idx)}`,
        pedagang: sub.pedagang,
        items: sub.items,
        totalSub: sub.totalSub,
        statusLapak: "Sedang disiapkan",
        waktuSerah: null
      }));

      const newOrder = {
        idInduk: idTransaksiInduk,
        waktuPesan: "Baru saja",
        estimasiMenit: 45,
        konsumen: {
          nama: "Mahasiswa / Warga Lokal",
          telp: "0812-9988-7766",
          alamat: deliveryMethod === 'delivery' ? "Gedung C No. 204, Kawasan Industri & Kampus" : "Pick-Up di Meja Konsolidasi Hub Pasar",
          catatan: "Pesanan bahan segar untuk masak siang"
        },
        metodeKirim: deliveryMethod === 'delivery' ? "Delivery (Kurir Hub)" : "Pick-Up di Hub Pasar",
        ongkirFlat: ongkirFlat,
        totalBarang: totalBarang,
        totalBayar: totalBayar,
        metodeBayar: metodeBayar,
        statusEscrow: "Dana Ditahan di Escrow PasarHub",
        tahapStatus: "diproses_pedagang",
        kurirTerkait: "Belum Ditugaskan (Menunggu Konsolidasi)",
        subOrders: subOrders
      };

      setIsProcessing(false);
      setIsSuccess(true);

      setTimeout(() => {
        onCompleteCheckout(newOrder);
      }, 1000);
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h3>
            <Wallet size={20} style={{ color: '#00AA13' }} />
            <span>Pembayaran &amp; Rekening Bersama (Escrow)</span>
          </h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Tutup">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Smart Escrow Info Card */}
          <div className="escrow-callout">
            <ShieldCheck className="escrow-callout-icon" />
            <div>
              <h4>Smart Escrow PasarHub Terproteksi</h4>
              <p>
                Dana sebesar <strong>Rp {totalBayar.toLocaleString('id-ID')}</strong> akan dikunci di Rekening Bersama Escrow. Mitra pedagang belum menerima dana sampai pesanan Anda terima secara utuh!
              </p>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
              Pilih Metode Pembayaran Digital
            </label>
            <div className="payment-grid">
              <div 
                className={`payment-card ${metodeBayar === 'QRIS' ? 'active' : ''}`}
                onClick={() => setMetodeBayar('QRIS')}
              >
                <QrCode size={20} style={{ color: '#DC2626' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>QRIS Standar</div>
                  <div style={{ fontSize: '10px', color: '#6B7280' }}>Semua E-Wallet &amp; Bank</div>
                </div>
              </div>

              <div 
                className={`payment-card ${metodeBayar === 'GoPay' ? 'active' : ''}`}
                onClick={() => setMetodeBayar('GoPay')}
              >
                <div className="payment-logo" style={{ color: '#00AED6' }}>GoPay</div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>GoPay</div>
                  <div style={{ fontSize: '10px', color: '#6B7280' }}>Instan via Aplikasi</div>
                </div>
              </div>

              <div 
                className={`payment-card ${metodeBayar === 'ShopeePay' ? 'active' : ''}`}
                onClick={() => setMetodeBayar('ShopeePay')}
              >
                <div className="payment-logo" style={{ color: '#EA580C' }}>Shopee</div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>ShopeePay</div>
                  <div style={{ fontSize: '10px', color: '#6B7280' }}>Saldo Shopee</div>
                </div>
              </div>

              <div 
                className={`payment-card ${metodeBayar === 'Dana' ? 'active' : ''}`}
                onClick={() => setMetodeBayar('Dana')}
              >
                <div className="payment-logo" style={{ color: '#2563EB' }}>DANA</div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>DANA Wallet</div>
                  <div style={{ fontSize: '10px', color: '#6B7280' }}>E-Wallet Nasional</div>
                </div>
              </div>
            </div>
          </div>

          {/* QRIS Interactive Code Simulation */}
          {metodeBayar === 'QRIS' && (
            <div className="qris-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#16A34A', fontWeight: 700 }}>
                <CheckCircle2 size={14} /> QRIS Nasional Resmi • PasarHub Paguyuban
              </div>

              <div className="qris-qr-code">
                <div className="qris-mock-pattern" />
                <div className="qris-center-badge">QRIS</div>
              </div>

              <div style={{ fontSize: '12px', color: '#64748B' }}>
                Buka GoPay, OVO, Dana, BCA, atau Livin' Mandiri lalu scan kode di atas.
              </div>

              <div style={{ background: '#F8FAFC', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                Total Bayar: <span style={{ color: '#00AA13' }}>Rp {totalBayar.toLocaleString('id-ID')}</span>
              </div>
            </div>
          )}

          {/* Sub-order Splitting Overview */}
          <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Rincian Pemecahan Otomatis (Order Splitting):
            </div>
            {Object.values(merchantGroups).map(sub => (
              <div key={sub.pedagang} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '3px 0' }}>
                <span style={{ color: '#475569' }}>• Sub-Order {sub.pedagang} ({sub.items.length} item):</span>
                <span style={{ fontWeight: 600 }}>Rp {sub.totalSub.toLocaleString('id-ID')}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '3px 0', borderTop: '1px dashed #CBD5E1', marginTop: '4px', paddingTop: '4px' }}>
              <span style={{ color: '#475569' }}>• Ongkir Flat Konsolidasi Hub:</span>
              <span style={{ fontWeight: 600 }}>Rp {ongkirFlat.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Total yang dibayar:</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#00AA13' }}>
              Rp {totalBayar.toLocaleString('id-ID')}
            </div>
          </div>

          <button 
            className="cart-action-btn"
            style={{ minWidth: '180px', justifyContent: 'center' }}
            onClick={handlePay}
            disabled={isProcessing || isSuccess}
          >
            {isProcessing ? (
              <span>Memproses Escrow...</span>
            ) : isSuccess ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} /> Berhasil Terbayar!
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Bayar Sekarang ({metodeBayar}) <ArrowRight size={16} />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
