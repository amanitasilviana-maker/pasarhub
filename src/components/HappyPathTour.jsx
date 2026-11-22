import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Store, 
  QrCode, 
  Bell, 
  PackageCheck, 
  Truck, 
  ShieldCheck, 
  Wallet,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HappyPathTour({ 
  isOpen, 
  onClose, 
  onNavigateRole,
  onAutoSimulateStep
}) {
  if (!isOpen) return null;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    {
      step: 1,
      title: "1. Konsumen Belanja Multi-Lapak",
      role: "consumer",
      icon: Store,
      badge: "Cross-Merchant Cart",
      desc: "Konsumen mencari dan menambahkan Daging Sapi (Lapak Bu Joko), Bayam (Lapak Pak Slamet), dan Bumbu Rendang (Lapak Mak Sumi) ke dalam satu Keranjang Bersama. Biaya ongkir tetap satu kali (flat Rp 5.000).",
      actionText: "Lihat di Katalog Konsumen",
      targetRole: "consumer"
    },
    {
      step: 2,
      title: "2. Checkout 1x Bayar via QRIS ke Smart Escrow",
      role: "consumer",
      icon: QrCode,
      badge: "Payment & Escrow",
      desc: "Konsumen melakukan scan QRIS atau bayar via E-Wallet. Sistem memecah pesanan induk menjadi Sub-Orders untuk masing-masing lapak, dan mengunci dana di Rekening Bersama Escrow PasarHub.",
      actionText: "Buka Menu Pembayaran",
      targetRole: "consumer"
    },
    {
      step: 3,
      title: "3. Notifikasi Otomatis ke 3 Pedagang",
      role: "merchant",
      icon: Bell,
      badge: "Order Splitting Engine",
      desc: "Sistem mengirim notifikasi pesanan ke masing-masing pedagang. Pedagang hanya melihat item miliknya sehingga tidak bingung dalam mengelola stok lapak.",
      actionText: "Lihat Tampilan Mitra UMKM",
      targetRole: "merchant"
    },
    {
      step: 4,
      title: "4. Pedagang Siapkan & Serahkan ke Hub",
      role: "merchant",
      icon: PackageCheck,
      badge: "Hub Logistics",
      desc: "Pedagang membungkus pesanan dan membawanya ke titik kumpul utama (Meja Konsolidasi Hub Gate 2). Tidak perlu menunggu kurir datang ke lapak.",
      actionText: "Simulasikan Serah Barang ke Hub",
      targetRole: "merchant"
    },
    {
      step: 5,
      title: "5. Admin Hub Verifikasi & Assign Kurir",
      role: "admin",
      icon: ShieldCheck,
      badge: "Hub-and-Spoke Admin",
      desc: "Admin Hub memeriksa checklist barang dari ketiga lapak. Setelah lengkap, barang digabung dalam 1 kantong bersegel dan dialokasikan ke armada kurir lokal.",
      actionText: "Buka Stasiun Konsolidasi Hub",
      targetRole: "admin"
    },
    {
      step: 6,
      title: "6. Kurir Mengantar ke Alamat Konsumen",
      role: "courier",
      icon: Truck,
      badge: "Hiperlokal Courier Fleet",
      desc: "Kurir lokal mengambil 1 paket konsolidasi di meja Hub lalu mengantarnya mengikuti rute hiperlokal ke alamat konsumen (SLA <90 menit).",
      actionText: "Buka Peta & Rute Kurir",
      targetRole: "courier"
    },
    {
      step: 7,
      title: "7. Konsumen Klik 'Pesanan Diterima'",
      role: "consumer",
      icon: CheckCircle2,
      badge: "Consumer Confirmation",
      desc: "Setelah barang diterima dengan kondisi segar dan lengkap, konsumen mengklik tombol 'Konfirmasi Pesanan Diterima' di pelacak status real-time.",
      actionText: "Buka Pelacak Pesanan Konsumen",
      targetRole: "consumer"
    },
    {
      step: 8,
      title: "8. Pencairan Otomatis Saldo Pedagang 100%",
      role: "merchant",
      icon: Wallet,
      badge: "0% Commission Payout",
      desc: "Smart Escrow otomatis membuka kunci dana dan meneruskan 100% hak penjualan langsung ke dompet digital masing-masing pedagang tanpa ada potongan sepeser pun!",
      actionText: "Lihat Saldo Dompet UMKM",
      targetRole: "merchant"
    }
  ];

  const currentStep = steps[currentStepIndex];
  const StepIcon = currentStep.icon;

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      confetti({ particleCount: 100, spread: 80 });
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleJumpToRole = () => {
    onNavigateRole(currentStep.targetRole);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="tour-banner-modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} style={{ color: '#FF8106' }} />
            <h3 style={{ fontSize: '16px', fontWeight: 800 }}>
              Simulasi Alur 8 Langkah PRD PasarHub
            </h3>
          </div>
          <button 
            className="modal-close-btn" 
            style={{ background: '#374151', color: 'white' }}
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* Progress Tracker */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
          {steps.map((st, i) => (
            <div
              key={st.step}
              onClick={() => setCurrentStepIndex(i)}
              style={{
                flex: 1,
                height: '6px',
                borderRadius: '4px',
                background: i <= currentStepIndex ? '#00AA13' : '#374151',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            />
          ))}
        </div>

        {/* Current Step Card */}
        <div style={{ background: '#111827', borderRadius: '16px', padding: '20px', border: '1px solid #374151', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span className="tour-step-pill">
              Langkah {currentStep.step} dari 8
            </span>
            <span style={{ fontSize: '11px', color: '#9CA3AF', background: '#1F2937', padding: '3px 8px', borderRadius: '6px' }}>
              {currentStep.badge}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#00AA13', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <StepIcon size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'white', marginBottom: '6px' }}>
                {currentStep.title}
              </h4>
              <p style={{ fontSize: '13px', color: '#D1D5DB', lineHeight: 1.5 }}>
                {currentStep.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <button
            onClick={handleJumpToRole}
            style={{ 
              background: '#374151', 
              color: 'white', 
              border: 'none', 
              padding: '10px 16px', 
              borderRadius: '50px', 
              fontSize: '12px', 
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Play size={13} /> {currentStep.actionText}
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            {currentStepIndex > 0 && (
              <button
                onClick={handlePrev}
                style={{ background: 'transparent', border: '1px solid #4B5563', color: '#9CA3AF', padding: '10px 18px', borderRadius: '50px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
              >
                Sebelumnya
              </button>
            )}

            <button
              onClick={handleNext}
              style={{ background: '#00AA13', color: 'white', border: 'none', padding: '10px 22px', borderRadius: '50px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <span>{currentStepIndex === steps.length - 1 ? 'Selesai Panduan' : 'Lanjut'}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
