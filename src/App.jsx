import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import ConsumerNavbar from './components/Navbars/ConsumerNavbar';
import MerchantNavbar from './components/Navbars/MerchantNavbar';
import CourierNavbar from './components/Navbars/CourierNavbar';
import AdminNavbar from './components/Navbars/AdminNavbar';

import Catalog from './components/ConsumerView/Catalog';
import CartDrawer from './components/ConsumerView/CartDrawer';
import CheckoutModal from './components/ConsumerView/CheckoutModal';
import OrderTrackingModal from './components/ConsumerView/OrderTrackingModal';
import MerchantPortal from './components/MerchantView/MerchantPortal';
import CourierPortal from './components/CourierView/CourierPortal';
import AdminHubPortal from './components/AdminHubView/AdminHubPortal';
import FooterPortalLinks from './components/FooterPortalLinks';
import LoginPage from './components/Auth/LoginPage';

import InformasiPage from './components/Info/InformasiPage';
import PanduanMitraPage from './components/Info/PanduanMitraPage';
import PanduanDriverPage from './components/Info/PanduanDriverPage';


import {
  INITIAL_PRODUCTS,
  INITIAL_MERCHANTS,
  INITIAL_COURIERS,
  INITIAL_ORDERS
} from './data/mockData';

export default function App() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [merchants, setMerchants] = useState(INITIAL_MERCHANTS);
  const [couriers, setCouriers] = useState(INITIAL_COURIERS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [dbStalls, setDbStalls] = useState([]);
  const [dbCouriers, setDbCouriers] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);
  const [currentMerchant, setCurrentMerchant] = useState(null);
  const [currentDriver, setCurrentDriver] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  const [selectedMerchant, setSelectedMerchant] = useState(Object.keys(INITIAL_MERCHANTS)[0]);
  const [selectedCourierId, setSelectedCourierId] = useState(INITIAL_COURIERS[0].id);
  const [loudAlertSimulated, setLoudAlertSimulated] = useState(false);

  // Guest Mode Cart Persistence (localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('pasarhub_guest_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pasarhub_guest_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Gagal menyimpan keranjang lokal:', e);
    }
  }, [cart]);

  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState(null);

  const fetchDatabaseData = async () => {
    try {
      const prodRes = await fetch('/api/v1/products');
      if (prodRes.ok) {
        const dbProds = await prodRes.json();
        if (dbProds.length > 0) {
          const merged = dbProds.map((p) => {
            const template = INITIAL_PRODUCTS.find((m) => m.nama === p.nama) || {};
            return {
              ...template,
              id: p.id,
              nama: p.nama,
              harga: p.harga,
              pedagang: p.pedagang,
              kategori: p.kategori,
              stok: p.stok,
              satuan: p.satuan,
              icon: p.gambar || template.icon || '🥬',
              warnaBg: template.warnaBg || '#E8F5E9'
            };
          });
          setProducts(merged);
        }
      }

      const verRes = await fetch('/api/v1/admin/verifications');
      if (verRes.ok) {
        const { stalls, couriers: fetchedCouriers } = await verRes.json();
        setDbStalls(stalls);
        setDbCouriers(fetchedCouriers);

        setMerchants((prev) => {
          const updated = { ...prev };
          stalls.forEach((st) => {
            if (updated[st.stall_name]) {
              updated[st.stall_name] = {
                ...updated[st.stall_name],
                dbStallId: st.id,
                is_approved: st.is_approved,
                verification_status: st.user?.verification_status || 'VERIFIED'
              };
            } else {
              updated[st.stall_name] = {
                nama: st.stall_name,
                pemilik: st.user?.name || 'Mitra Baru',
                lokasiLapak: st.block_number,
                avatar: '🏪',
                saldo: Number(st.user?.wallet_balance || 0),
                dbStallId: st.id,
                is_approved: st.is_approved,
                verification_status: st.user?.verification_status || 'PENDING_REVIEW'
              };
            }
          });
          return updated;
        });
      }

      const ordRes = await fetch('/api/v1/orders');
      if (ordRes.ok) {
        const dbOrders = await ordRes.json();
        if (dbOrders.length > 0) {
          const statusMap = {
            PENDING_PAYMENT: 'menunggu_bayar',
            PROCESSING_STALLS: 'diproses_pedagang',
            CONSOLIDATING_HUB: 'konsolidasi_hub',
            OUT_FOR_DELIVERY: 'sedang_diantar',
            COMPLETED: 'selesai'
          };
          const formattedOrders = dbOrders.map((o) => ({
            idInduk: o.id,
            waktuPesan: new Date(o.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
            estimasiMenit: 35,
            konsumen: {
              nama: o.customer?.name || 'Konsumen PasarHub',
              telp: o.customer?.phone || '0812-8877-6655',
              alamat: o.delivery_address || 'Posko Hub Pasar',
              catatan: 'Tersimpan di Supabase'
            },
            metodeKirim: o.fulfillment_type === 'PICKUP' ? 'Ambil di Hub' : 'Delivery (Kurir Hub)',
            ongkirFlat: Number(o.delivery_fee),
            totalBarang: Number(o.total_product_amount),
            totalBayar: Number(o.grand_total),
            metodeBayar: 'QRIS',
            statusEscrow: o.escrow_status === 'RELEASED'
              ? 'Dana Dicairkan ke Pedagang 100% (Potongan 0%)'
              : 'Dana Ditahan di Escrow PasarHub',
            tahapStatus: statusMap[o.order_status] || 'diproses_pedagang',
            kurirTerkait: o.courier?.name || 'Menunggu Kurir Hub',
            subOrders: o.sub_orders.map((sub) => ({
              idSub: sub.id,
              pedagang: sub.stall.stall_name,
              items: sub.items.map((it) => ({
                nama: it.product.name,
                qty: it.quantity,
                harga: Number(it.price_snapshot)
              })),
              totalSub: Number(sub.subtotal),
              statusLapak: sub.stall_status === 'READY_AT_HUB' ? 'Sudah diantar ke Hub' : 'Sedang disiapkan',
              waktuSerah: sub.stall_status === 'READY_AT_HUB' ? 'Tiba di Hub' : null
            }))
          }));
          setOrders(formattedOrders);
          if (!activeTrackingOrderId && formattedOrders[0]) {
            setActiveTrackingOrderId(formattedOrders[0].idInduk);
          }
        }
      }
    } catch (err) {
      console.error('Gagal mengambil data dari server:', err);
    }
  };

  useEffect(() => {
    fetchDatabaseData();
  }, []);

  const handleLoginSuccess = (persona, authPayload) => {
    if (persona === 'user') {
      setCurrentUser(authPayload);
      // Migrasi otomatis keranjang guest langsung ke modal checkout jika ada item
      if (cart.length > 0) {
        navigate('/');
        setIsCartOpen(false);
        setIsCheckoutOpen(true);
      }
    }
    if (persona === 'umkm') {
      const merchantInfo = merchants[authPayload.nama] || {};
      setCurrentMerchant({
        ...authPayload,
        is_approved: merchantInfo.is_approved ?? true,
        verification_status: merchantInfo.verification_status || 'VERIFIED'
      });
      if (merchants[authPayload.nama]) setSelectedMerchant(authPayload.nama);
    }
    if (persona === 'driver') {
      setCurrentDriver({
        ...authPayload,
        verification_status: authPayload.verification_status || 'VERIFIED'
      });
    }
    if (persona === 'admin') setCurrentAdmin(authPayload);
  };

  const handleLogout = (persona) => {
    if (persona === 'user') setCurrentUser(null);
    if (persona === 'umkm') setCurrentMerchant(null);
    if (persona === 'driver') setCurrentDriver(null);
    if (persona === 'admin') setCurrentAdmin(null);
  };

  const handleApproveStall = async (stallId, isApproved) => {
    try {
      await fetch(`/api/v1/admin/stalls/${stallId}/approval`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved })
      });
      await fetchDatabaseData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleApproveCourier = async (courierId, isVerified) => {
    try {
      await fetch(`/api/v1/admin/couriers/${courierId}/approval`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVerified })
      });
      await fetchDatabaseData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddNewProduct = async (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    try {
      await fetch('/api/v1/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      fetchDatabaseData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing && existing.qty > 1) {
        return prev.map((item) => item.id === productId ? { ...item, qty: item.qty - 1 } : item);
      }
      return prev.filter((item) => item.id !== productId);
    });
  };

  const handleClearCart = () => setCart([]);

  const handleCompleteCheckout = async (newOrder) => {
    try {
      const res = await fetch('/api/v1/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          deliveryMethod,
          alamat: newOrder.konsumen.alamat,
          totalProduk: newOrder.totalBarang,
          ongkir: newOrder.ongkirFlat,
          grandTotal: newOrder.totalBayar
        })
      });
      if (res.ok) {
        const savedOrder = await res.json();
        await fetchDatabaseData();
        setActiveTrackingOrderId(savedOrder.id);
      } else {
        setOrders((prev) => [newOrder, ...prev]);
        setActiveTrackingOrderId(newOrder.idInduk);
      }
    } catch (e) {
      setOrders((prev) => [newOrder, ...prev]);
    }
    setCart([]);
    localStorage.removeItem('pasarhub_guest_cart');
    setIsCheckoutOpen(false);
    setIsTrackingOpen(true);
  };

  const handleConfirmOrderReceived = async (orderId) => {
    try {
      await fetch(`/api/v1/orders/${orderId}/complete`, { method: 'PATCH' });
      await fetchDatabaseData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeliverSubOrderToHub = async (idInduk, idSub) => {
    try {
      await fetch(`/api/v1/sub-orders/${idSub}/ready`, { method: 'PATCH' });
      await fetchDatabaseData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleConsolidateOrder = async (idInduk) => {
    try {
      await fetch(`/api/v1/orders/${idInduk}/consolidate`, { method: 'PATCH' });
      await fetchDatabaseData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateOrderStatus = async (idInduk, newStatus) => {
    if (newStatus === 'selesai') {
      await handleConfirmOrderReceived(idInduk);
    } else {
      setOrders((prev) => prev.map((ord) => ord.idInduk === idInduk ? { ...ord, tahapStatus: newStatus } : ord));
    }
  };

  const handleWithdrawMerchantBalance = (merchantName) => {
    setMerchants((prev) => {
      const m = prev[merchantName];
      if (!m) return prev;
      return {
        ...prev,
        [merchantName]: { ...m, totalPencairan: (m.totalPencairan || 0) + m.saldo, saldo: 0 }
      };
    });
  };

  const totalCartCount = cart.reduce((sum, it) => sum + it.qty, 0);
  const activeTrackingOrder = orders.find((o) => o.idInduk === activeTrackingOrderId) || orders[0];

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={
          <div className="page-container">
            <ConsumerNavbar
              cartCount={totalCartCount}
              onOpenCart={() => setIsCartOpen(true)}
              ordersCount={orders.length}
              onOpenTracking={() => setIsTrackingOpen(true)}
              currentUser={currentUser}
              onLogout={() => handleLogout('user')}
            />
            <main className="main-content">
              <Catalog
                products={products}
                cart={cart}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                onOpenCart={() => setIsCartOpen(true)}
              />
            </main>
            {totalCartCount > 0 && !isCartOpen && (
              <aside className="floating-cart" aria-label="Ringkasan Keranjang">
                <div className="cart-summary-info">
                  <div className="cart-icon-bubble">
                    🛒
                    <span className="cart-count-badge">{totalCartCount}</span>
                  </div>
                  <div className="cart-text-wrap">
                    <span className="cart-total-price">
                      Rp {(cart.reduce((sum, item) => sum + (item.harga * item.qty), 0) + (deliveryMethod === 'delivery' ? 5000 : 0)).toLocaleString('id-ID')}
                    </span>
                    <span className="cart-flat-note">✓ Ongkir Flat Rp 5.000 Lintas Lapak</span>
                  </div>
                </div>
                <button className="cart-action-btn" onClick={() => setIsCartOpen(true)}>Lihat Keranjang</button>
              </aside>
            )}
            <CartDrawer
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              cart={cart}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onClearCart={handleClearCart}
              onProceedToCheckout={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              deliveryMethod={deliveryMethod}
              setDeliveryMethod={setDeliveryMethod}
              currentUser={currentUser}
            />
            <CheckoutModal
              isOpen={isCheckoutOpen}
              onClose={() => setIsCheckoutOpen(false)}
              cart={cart}
              deliveryMethod={deliveryMethod}
              onCompleteCheckout={handleCompleteCheckout}
            />
            <OrderTrackingModal
              isOpen={isTrackingOpen}
              onClose={() => setIsTrackingOpen(false)}
              order={activeTrackingOrder}
              onConfirmOrderReceived={handleConfirmOrderReceived}
            />
          </div>
        } />
        <Route path="/informasi" element={<InformasiPage />} />
        <Route path="/panduan-mitra" element={<PanduanMitraPage />} />
        <Route path="/panduan-driver" element={<PanduanDriverPage />} />

        <Route path="/umkm" element={
          <div className="page-container">
            <MerchantNavbar
              selectedMerchant={selectedMerchant}
              setSelectedMerchant={setSelectedMerchant}
              merchants={merchants}
              onTriggerSoundAlert={() => {
                setLoudAlertSimulated(true);
                setTimeout(() => setLoudAlertSimulated(false), 4000);
              }}
              currentMerchant={currentMerchant}
              onLogout={() => handleLogout('umkm')}
            />
            <main className="main-content">
              <MerchantPortal
                merchants={merchants}
                orders={orders}
                selectedMerchant={selectedMerchant}
                setSelectedMerchant={setSelectedMerchant}
                loudAlertSimulated={loudAlertSimulated}
                setLoudAlertSimulated={setLoudAlertSimulated}
                onDeliverSubOrderToHub={handleDeliverSubOrderToHub}
                onWithdrawMerchantBalance={handleWithdrawMerchantBalance}
                currentMerchant={currentMerchant}
                onAddNewProduct={handleAddNewProduct}
              />
            </main>
          </div>
        } />

        <Route path="/driver" element={
          <div className="page-container">
            <CourierNavbar
              selectedCourierId={selectedCourierId}
              setSelectedCourierId={setSelectedCourierId}
              couriers={couriers}
              currentDriver={currentDriver}
              onLogout={() => handleLogout('driver')}
            />
            <main className="main-content">
              <CourierPortal
                couriers={couriers}
                orders={orders}
                selectedCourierId={selectedCourierId}
                setSelectedCourierId={setSelectedCourierId}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                currentDriver={currentDriver}
              />
            </main>
          </div>
        } />

        <Route path="/admin" element={
          <div className="page-container">
            <AdminNavbar currentAdmin={currentAdmin} onLogout={() => handleLogout('admin')} />
            <main className="main-content">
              <AdminHubPortal
                orders={orders}
                merchants={merchants}
                couriers={couriers}
                dbStalls={dbStalls}
                dbCouriers={dbCouriers}
                onConsolidateOrder={handleConsolidateOrder}
                onApproveStall={handleApproveStall}
                onApproveCourier={handleApproveCourier}
                currentAdmin={currentAdmin}
              />
            </main>
          </div>
        } />

        <Route path="/login-user" element={<LoginPage persona="user" onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/login-umkm" element={<LoginPage persona="umkm" onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/login-driver" element={<LoginPage persona="driver" onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/login-admin" element={<LoginPage persona="admin" onLoginSuccess={handleLoginSuccess} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <FooterPortalLinks />
    </div>
  );
}