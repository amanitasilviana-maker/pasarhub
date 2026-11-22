import React, { useState } from 'react';
import { 
  Store, 
  Wallet, 
  Bell, 
  BellRing, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Package, 
  AlertTriangle,
  Send,
  Sparkles,
  Volume2,
  PlusCircle,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

export default function MerchantPortal({ 
  merchants, 
  orders, 
  onDeliverSubOrderToHub,
  onWithdrawMerchantBalance,
  selectedMerchant: propSelectedMerchant,
  setSelectedMerchant: propSetSelectedMerchant,
  loudAlertSimulated: propLoudAlertSimulated,
  setLoudAlertSimulated: propSetLoudAlertSimulated,
  currentMerchant,
  onAddNewProduct
}) {
  const navigate = useNavigate();
  const merchantNames = Object.keys(merchants);
  const [internalMerchant, setInternalMerchant] = useState(merchantNames[0]);
  const [internalLoudAlert, setInternalLoudAlert] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loginAlert, setLoginAlert] = useState("");

  // Form state for Tambah Dagangan Baru
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("Sayur");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductUnit, setNewProductUnit] = useState("500 gram");
  const [newProductBadge, setNewProductBadge] = useState("Segar Hari Ini");
  const [newProductDesc, setNewProductDesc] = useState("");

  const selectedMerchant = propSelectedMerchant || internalMerchant;
  const setSelectedMerchant = propSetSelectedMerchant || setInternalMerchant;
  const loudAlertSimulated = propLoudAlertSimulated !== undefined ? propLoudAlertSimulated : internalLoudAlert;
  const setLoudAlertSimulated = propSetLoudAlertSimulated || setInternalLoudAlert;

  const currentData = merchants[selectedMerchant] || {};

  const handleOpenAddModal = () => {
    if (!currentMerchant) {
      setLoginAlert("⚠️ Anda wajib Login sebagai Mitra UMKM terlebih dahulu untuk menambah dagangan baru.");
      return;
    }
    setLoginAlert("");
    setIsAddModalOpen(true);
  };

  const handleSaveNewProduct = (e) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice) return;

    const newProd = {
      id: Date.now(),
      nama: newProductName,
      harga: Number(newProductPrice),
      pedagang: selectedMerchant,
      kategori: newProductCategory,
      badge: newProductBadge || "Segar Pilihan",
      stok: 25,
      rating: 5.0,
      terjual: 0,
      satuan: newProductUnit || "1 kemasan",
      deskripsi: newProductDesc || "Produk segar berkualitas tinggi dari lapak mitra pasar.",
      icon: newProductCategory === 'Sayur' ? '🥬' : newProductCategory === 'Daging' ? '🥩' : newProductCategory === 'Bumbu' ? '🥣' : newProductCategory === 'Seafood' ? '🐟' : '📦',
      warnaBg: '#F3F4F6'
    };

    if (onAddNewProduct) {
      onAddNewProduct(newProd);
    }

    confetti({ particleCount: 70, spread: 60 });
    setIsAddModalOpen(false);
    setNewProductName("");
    setNewProductPrice("");
    setNewProductDesc("");
    alert(`Berhasil menambahkan produk "${newProd.nama}" ke katalog pasar!`);
  };

  // Extract all sub-orders for this specific merchant
  const relevantSubOrders = [];
  orders.forEach(ord => {
    ord.subOrders.forEach(sub => {
      if (sub.pedagang === selectedMerchant) {
        relevantSubOrders.push({
          idInduk: ord.idInduk,
          waktuPesan: ord.waktuPesan,
          tahapStatus: ord.tahapStatus,
          statusEscrow: ord.statusEscrow,
          konsumenNama: ord.konsumen.nama,
          subOrder: sub
        });
      }
    });
  });

  const handleWithdraw = () => {
    if (currentData.saldo <= 0) {
      alert("Saldo aktif saat ini masih Rp 0. Tunggu pesanan diselesaikan pembeli.");
      return;
    }
    setIsWithdrawing(true);
    setTimeout(() => {
      onWithdrawMerchantBalance(selectedMerchant);
      setIsWithdrawing(false);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
      alert(`Pencairan dana Rp ${currentData.saldo.toLocaleString('id-ID')} instan 100% tanpa potongan berhasil ditransfer ke rekening ${currentData.pemilik}!`);
    }, 1000);
  };

  const triggerSoundAlert = () => {
    setLoudAlertSimulated(true);
    setTimeout(() => setLoudAlertSimulated(false), 4000);
  };

  return (
    <div className="merchant-portal-container">
      {/* Merchant Persona Switcher */}
      <div style={{ background: 'white', padding: '12px 16px', borderRadius: '16px', marginBottom: '18px', border: '1px solid #E5E9EF', display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280', whiteSpace: 'nowrap' }}>
          Pilih Akun Pedagang:
        </span>
        {merchantNames.map(name => (
          <button
            key={name}
            className={`role-pill-btn ${selectedMerchant === name ? 'active' : ''}`}
            onClick={() => setSelectedMerchant(name)}
            style={{ fontSize: '12px' }}
          >
            <span>{merchants[name].avatar} {name.split(' (')[0]}</span>
          </button>
        ))}
      </div>

      {/* Loud Alert Banner Simulation */}
      {loudAlertSimulated && (
        <div className="audio-alert-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BellRing size={24} style={{ color: '#D97706' }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '14px', color: '#92400E' }}>
                🔔 NOTIFIKASI PESANAN MASUK NYARING (SIMULASI SUARA BEL PASAR)!
              </div>
              <div style={{ fontSize: '12px', color: '#B45309' }}>
                Pesanan baru terdeteksi. Segera siapkan barang untuk dibawa ke meja Hub.
              </div>
            </div>
          </div>
          <button 
            onClick={() => setLoudAlertSimulated(false)}
            style={{ background: '#F59E0B', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
          >
            Matikan Suara
          </button>
        </div>
      )}

      {/* Login Warning Banner if not authenticated */}
      {!currentMerchant && (
        <div style={{ background: '#FEF2F2', border: '1.5px solid #F87171', borderRadius: '12px', padding: '14px 18px', marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#991B1B' }}>
              🔒 Mode Pratinjau — Anda Belum Login sebagai Mitra
            </div>
            <div style={{ fontSize: '12px', color: '#B91C1C', marginTop: '2px' }}>
              Silakan login untuk menambah dagangan baru, mengonfirmasi serah terima ke Hub, atau mencairkan saldo.
            </div>
          </div>
          <button 
            style={{ background: '#DC2626', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '50px', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}
            onClick={() => navigate('/login-umkm')}
          >
            Login Mitra Sekarang
          </button>
        </div>
      )}

      {loginAlert && (
        <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', color: '#92400E', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', marginBottom: '14px', fontWeight: 600 }}>
          {loginAlert}
        </div>
      )}

      {/* Merchant Profile Header */}
      <div className="merchant-header-card">
        <div className="merchant-profile-info">
          <div className="merchant-avatar">
            {currentData.avatar || '🏪'}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#111827' }}>
                {currentData.nama}
              </h2>
              <span style={{ background: '#DCFCE7', color: '#15803D', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px' }}>
                Lapak Aktif
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
              Pengelola: <strong>{currentData.pemilik}</strong> • {currentData.lokasiLapak}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            className="role-pill-btn"
            style={{ background: '#00AA13', color: 'white', fontWeight: 700, boxShadow: '0 2px 8px rgba(0, 170, 19, 0.25)' }}
            onClick={handleOpenAddModal}
            title="Tambah produk dagangan baru ke katalog pasar"
          >
            <PlusCircle size={15} />
            <span>+ Tambah Dagangan Baru</span>
          </button>

          <button 
            className="role-pill-btn"
            style={{ background: '#FEF3C7', color: '#B45309', border: '1px solid #FDE68A', fontWeight: 700 }}
            onClick={triggerSoundAlert}
            title="Uji coba notifikasi nyaring untuk pedagang"
          >
            <Volume2 size={16} />
            <span>Uji Suara Notif</span>
          </button>
        </div>
      </div>

      {/* Dompet Digital UMKM (100% Bersih Tanpa Komisi) */}
      <div className="merchant-balance-card">
        <div>
          <div className="balance-title">Saldo Bersih Siap Cair (Potongan 0%)</div>
          <div className="balance-amount">
            Rp {(currentData.saldo || 0).toLocaleString('id-ID')}
          </div>
          <div className="zero-cut-badge">
            <Sparkles size={12} />
            <span>100% Hak Pedagang • Bebas Potongan Komisi Pihak Ketiga</span>
          </div>
        </div>

        <div>
          <button 
            className="action-btn"
            style={{ 
              background: '#00AA13', 
              color: 'white', 
              padding: '12px 24px', 
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: 800,
              boxShadow: '0 4px 14px rgba(0, 170, 19, 0.4)',
              cursor: 'pointer'
            }}
            onClick={handleWithdraw}
            disabled={isWithdrawing || (currentData.saldo || 0) <= 0}
          >
            {isWithdrawing ? "Mentransfer..." : "Tarik Saldo Instan (Rp 0 Biaya)"}
          </button>
          <div style={{ fontSize: '11px', color: '#9CA3AF', textAlign: 'center', marginTop: '6px' }}>
            Pencairan otomatis ke Rekening / E-Wallet {currentData.pemilik}
          </div>
        </div>
      </div>

      {/* Incoming Sub-Orders List */}
      <div className="section-header">
        <h2>
          <Package size={20} style={{ color: '#00AA13' }} />
          <span>Daftar Pesanan Lapak Ini (Order Splitting)</span>
        </h2>
        <span style={{ fontSize: '12px', color: '#6B7280' }}>
          {relevantSubOrders.length} Sub-Order Tercatat
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {relevantSubOrders.length === 0 ? (
          <div style={{ background: 'white', padding: '40px 20px', borderRadius: '16px', textAlign: 'center', border: '1px solid #E5E7EB' }}>
            <Store size={40} style={{ color: '#D1D5DB', margin: '0 auto 12px auto' }} />
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
              Belum Ada Pesanan untuk Lapak Ini
            </h4>
            <p style={{ fontSize: '13px', color: '#6B7280' }}>
              Buka menu Konsumen untuk mencoba belanja produk dari lapak ini.
            </p>
          </div>
        ) : (
          relevantSubOrders.map(item => {
            const isDeliveredToHub = item.subOrder.statusLapak.includes('Sudah');
            const isCompleted = item.tahapStatus === 'selesai';

            return (
              <div 
                key={item.subOrder.idSub}
                style={{ 
                  background: 'white', 
                  borderRadius: '16px', 
                  padding: '18px', 
                  border: '1.5px solid #E5E9EF',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', background: '#F1F5F9', color: '#475569', padding: '3px 8px', borderRadius: '6px', fontWeight: 700, fontFamily: 'monospace' }}>
                        {item.subOrder.idSub}
                      </span>
                      <span style={{ fontSize: '12px', color: '#6B7280' }}>• ID Induk: {item.idInduk}</span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937', marginTop: '4px' }}>
                      Pembeli: {item.konsumenNama}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      fontSize: '11px', 
                      fontWeight: 800, 
                      padding: '4px 10px', 
                      borderRadius: '20px',
                      background: isCompleted ? '#DCFCE7' : isDeliveredToHub ? '#E0F2FE' : '#FEF3C7',
                      color: isCompleted ? '#15803D' : isDeliveredToHub ? '#0369A1' : '#B45309'
                    }}>
                      {isCompleted ? "✓ Selesai & Dana Cair" : item.subOrder.statusLapak}
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#00AA13', marginTop: '4px' }}>
                      Rp {item.subOrder.totalSub.toLocaleString('id-ID')} (100% Bersih)
                    </div>
                  </div>
                </div>

                {/* Items to prepare */}
                <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '12px', marginBottom: '14px', border: '1px solid #EEF2F6' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Barang yang Perlu Disiapkan Lapak Ini:
                  </div>
                  {item.subOrder.items.map((it, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0' }}>
                      <span style={{ fontWeight: 600, color: '#1E293B' }}>
                        📦 {it.qty || 1}x {it.nama}
                      </span>
                      <span style={{ color: '#475569' }}>
                        Rp {((it.harga || 0) * (it.qty || 1)).toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                {!isDeliveredToHub && !isCompleted && (
                  <button
                    className="action-btn"
                    style={{ 
                      background: '#00AA13', 
                      color: 'white', 
                      padding: '12px', 
                      borderRadius: '12px', 
                      fontSize: '13px', 
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                    onClick={() => onDeliverSubOrderToHub(item.idInduk, item.subOrder.idSub)}
                  >
                    <Send size={15} />
                    <span>Konfirmasi: Barang Siap &amp; Serahkan ke Titik Hub Pasar</span>
                  </button>
                )}

                {isDeliveredToHub && !isCompleted && (
                  <div style={{ background: '#F0FDF4', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', color: '#166534', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={16} />
                    <span>Barang sudah diantar ke Meja Konsolidasi Hub. Menunggu kurir mengantar ke pembeli.</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* MODAL TAMBAH DAGANGAN BARU */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <h3>
                <PlusCircle size={20} style={{ color: '#00AA13' }} />
                <span>Tambah Dagangan Baru ke Lapak</span>
              </h3>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveNewProduct} className="modal-body">
              <div style={{ background: '#F0FDF4', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', color: '#166534', fontWeight: 600 }}>
                📍 Produk akan didaftarkan atas nama: <strong>{selectedMerchant}</strong>
              </div>

              <div className="login-field">
                <label>Nama Produk Dagangan *</label>
                <input 
                  type="text" 
                  className="login-input" 
                  placeholder="Misal: Ikan Gurame Segar (1kg)"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="login-field">
                  <label>Kategori Pasar *</label>
                  <select 
                    className="login-input" 
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                    style={{ paddingLeft: '12px' }}
                  >
                    <option value="Sayur">Sayur</option>
                    <option value="Daging">Daging &amp; Ayam</option>
                    <option value="Bumbu">Bumbu Dapur</option>
                    <option value="Seafood">Ikan &amp; Seafood</option>
                    <option value="Sembako">Tahu &amp; Tempe</option>
                    <option value="Buah">Buah Segar</option>
                  </select>
                </div>

                <div className="login-field">
                  <label>Harga Jual (Rp) *</label>
                  <input 
                    type="number" 
                    className="login-input" 
                    placeholder="25000"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    style={{ paddingLeft: '12px' }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="login-field">
                  <label>Satuan Produk</label>
                  <input 
                    type="text" 
                    className="login-input" 
                    placeholder="1 kg / 1 ikat / 500g"
                    value={newProductUnit}
                    onChange={(e) => setNewProductUnit(e.target.value)}
                    style={{ paddingLeft: '12px' }}
                  />
                </div>

                <div className="login-field">
                  <label>Label / Badge</label>
                  <input 
                    type="text" 
                    className="login-input" 
                    placeholder="Segar Pagi / Organik / Halal"
                    value={newProductBadge}
                    onChange={(e) => setNewProductBadge(e.target.value)}
                    style={{ paddingLeft: '12px' }}
                  />
                </div>
              </div>

              <div className="login-field">
                <label>Deskripsi Singkat</label>
                <textarea 
                  className="login-input" 
                  rows="2"
                  placeholder="Keterangan kondisi produk, asal petani, atau kualitas barang..."
                  value={newProductDesc}
                  onChange={(e) => setNewProductDesc(e.target.value)}
                  style={{ paddingLeft: '12px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  style={{ flex: 1, padding: '12px', borderRadius: '50px', border: '1px solid #CBD5E1', background: 'transparent', fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="cart-action-btn"
                  style={{ flex: 2, justifyContent: 'center' }}
                >
                  Simpan &amp; Publikasikan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
