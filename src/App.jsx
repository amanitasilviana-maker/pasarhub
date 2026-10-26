import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Dedicated Navbars per Persona
import ConsumerNavbar from './components/Navbars/ConsumerNavbar';
import MerchantNavbar from './components/Navbars/MerchantNavbar';
import CourierNavbar from './components/Navbars/CourierNavbar';
import AdminNavbar from './components/Navbars/AdminNavbar';

// Page Views
import Catalog from './components/ConsumerView/Catalog';
import CartDrawer from './components/ConsumerView/CartDrawer';
import CheckoutModal from './components/ConsumerView/CheckoutModal';
import OrderTrackingModal from './components/ConsumerView/OrderTrackingModal';
import MerchantPortal from './components/MerchantView/MerchantPortal';
import CourierPortal from './components/CourierView/CourierPortal';
import AdminHubPortal from './components/AdminHubView/AdminHubPortal';
import FooterPortalLinks from './components/FooterPortalLinks';

// Login Page Component
import LoginPage from './components/Auth/LoginPage';

// Mock Shared Database
import { 
  INITIAL_PRODUCTS, 
  INITIAL_MERCHANTS, 
  INITIAL_COURIERS, 
  INITIAL_ORDERS 
} from './data/mockData';

export default function App() {
  // Shared Application State
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [merchants, setMerchants] = useState(INITIAL_MERCHANTS);
  const [couriers] = useState(INITIAL_COURIERS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // Authentication States per Persona
  const [currentUser, setCurrentUser] = useState(null);
  const [currentMerchant, setCurrentMerchant] = useState(null);
  const [currentDriver, setCurrentDriver] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  // Active Persona Sub-Selections
  const [selectedMerchant, setSelectedMerchant] = useState(Object.keys(INITIAL_MERCHANTS)[0]);
  const [selectedCourierId, setSelectedCourierId] = useState(INITIAL_COURIERS[0].id);
  const [loudAlertSimulated, setLoudAlertSimulated] = useState(false);

  // Consumer Cart State
  const [cart, setCart] = useState([
    { ...INITIAL_PRODUCTS[0], qty: 1 }, // Daging Sapi (Bu Joko)
    { ...INITIAL_PRODUCTS[2], qty: 1 }, // Bayam (Pak Slamet)
    { ...INITIAL_PRODUCTS[5], qty: 1 }  // Bumbu Rendang (Mak Sumi)
  ]);
  const [deliveryMethod, setDeliveryMethod] = useState('delivery'); // 'delivery' or 'pickup'

  // Modals visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState(INITIAL_ORDERS[0]?.idInduk);

  // Auth Handlers
  const handleLoginSuccess = (persona, authPayload) => {
    if (persona === 'user') setCurrentUser(authPayload);
    if (persona === 'umkm') {
      setCurrentMerchant(authPayload);
      if (merchants[authPayload.nama]) {
        setSelectedMerchant(authPayload.nama);
      }
    }
    if (persona === 'driver') setCurrentDriver(authPayload);
    if (persona === 'admin') setCurrentAdmin(authPayload);
  };

  const handleLogout = (persona) => {
    if (persona === 'user') setCurrentUser(null);
    if (persona === 'umkm') setCurrentMerchant(null);
    if (persona === 'driver') setCurrentDriver(null);
    if (persona === 'admin') setCurrentAdmin(null);
  };

  // Feature: Mitra UMKM menambah dagangan baru
  const handleAddNewProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  // Cart operations
  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing && existing.qty > 1) {
        return prev.map(item => 
          item.id === productId ? { ...item, qty: item.qty - 1 } : item
        );
      }
      return prev.filter(item => item.id !== productId);
    });
  };

  const handleClearCart = () => setCart([]);

  // Checkout completed
  const handleCompleteCheckout = (newOrder) => {
    const enrichedOrder = {
      ...newOrder,
      konsumen: currentUser ? {
        nama: currentUser.nama,
        telp: "0812-8877-6655",
        alamat: newOrder.konsumen.alamat,
        catatan: "Pesanan terkonfirmasi oleh " + currentUser.nama
      } : newOrder.konsumen
    };

    setOrders(prev => [enrichedOrder, ...prev]);
    setCart([]);
    setIsCheckoutOpen(false);
    setActiveTrackingOrderId(enrichedOrder.idInduk);
    setIsTrackingOpen(true);
  };

  // Buyer confirms order received (Releases Escrow 100% to merchants!)
  const handleConfirmOrderReceived = (orderId) => {
    setOrders(prev => {
      const updated = prev.map(ord => {
        if (ord.idInduk === orderId) {
          return {
            ...ord,
            tahapStatus: 'selesai',
            statusEscrow: 'Dana Dicairkan ke Pedagang 100% (Potongan 0%)'
          };
        }
        return ord;
      });

      // Credit funds to merchants without any commission
      const targetOrder = prev.find(o => o.idInduk === orderId);
      if (targetOrder) {
        setMerchants(currentMerchants => {
          const nextMerchants = { ...currentMerchants };
          targetOrder.subOrders.forEach(sub => {
            if (nextMerchants[sub.pedagang]) {
              nextMerchants[sub.pedagang] = {
                ...nextMerchants[sub.pedagang],
                saldo: (nextMerchants[sub.pedagang].saldo || 0) + sub.totalSub
              };
            }
          });
          return nextMerchants;
        });
      }

      return updated;
    });
  };

  // Merchant delivers their sub-order to the Hub
  const handleDeliverSubOrderToHub = (idInduk, idSub) => {
    setOrders(prev => prev.map(ord => {
      if (ord.idInduk === idInduk) {
        const nextSubOrders = ord.subOrders.map(sub => {
          if (sub.idSub === idSub) {
            return {
              ...sub,
              statusLapak: "Sudah diantar ke Hub",
              waktuSerah: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + " WIB"
            };
          }
          return sub;
        });

        const allAtHub = nextSubOrders.every(s => s.statusLapak.includes('Sudah'));

        return {
          ...ord,
          subOrders: nextSubOrders,
          tahapStatus: allAtHub ? 'konsolidasi_hub' : ord.tahapStatus
        };
      }
      return ord;
    }));
  };

  // Hub Admin consolidates package and assigns courier
  const handleConsolidateOrder = (idInduk, courierName) => {
    setOrders(prev => prev.map(ord => {
      if (ord.idInduk === idInduk) {
        return {
          ...ord,
          tahapStatus: 'sedang_diantar',
          kurirTerkait: courierName
        };
      }
      return ord;
    }));
  };

  // Courier updates delivery state
  const handleUpdateOrderStatus = (idInduk, newStatus) => {
    if (newStatus === 'selesai') {
      handleConfirmOrderReceived(idInduk);
    } else {
      setOrders(prev => prev.map(ord => {
        if (ord.idInduk === idInduk) {
          return { ...ord, tahapStatus: newStatus };
        }
        return ord;
      }));
    }
  };

  // Merchant withdraws digital wallet balance
  const handleWithdrawMerchantBalance = (merchantName) => {
    setMerchants(prev => {
      const m = prev[merchantName];
      if (!m) return prev;
      return {
        ...prev,
        [merchantName]: {
          ...m,
          totalPencairan: (m.totalPencairan || 0) + m.saldo,
          saldo: 0
        }
      };
    });
  };

  const totalCartCount = cart.reduce((sum, it) => sum + it.qty, 0);
  const activeTrackingOrder = orders.find(o => o.idInduk === activeTrackingOrderId) || orders[0];

  return (
    <div className="app-container">
      <Routes>
        {/* =========================================
            PAGE 1: KONSUMEN ("/")
            ========================================= */}
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

            {/* Floating Cart for Mobile / Consumer View */}
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
                    <span className="cart-flat-note">
                      ✓ Ongkir Flat Rp 5.000 Lintas Lapak
                    </span>
                  </div>
                </div>

                <button className="cart-action-btn" onClick={() => setIsCartOpen(true)}>
                  Lihat Keranjang
                </button>
              </aside>
            )}

            {/* Cart Drawer */}
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

            {/* Checkout Modal */}
            <CheckoutModal
              isOpen={isCheckoutOpen}
              onClose={() => setIsCheckoutOpen(false)}
              cart={cart}
              deliveryMethod={deliveryMethod}
              onCompleteCheckout={handleCompleteCheckout}
            />

            {/* Live Order Tracking Modal */}
            <OrderTrackingModal
              isOpen={isTrackingOpen}
              onClose={() => setIsTrackingOpen(false)}
              order={activeTrackingOrder}
              onConfirmOrderReceived={handleConfirmOrderReceived}
            />
          </div>
        } />

        {/* =========================================
            PAGE 2: MITRA UMKM ("/umkm")
            ========================================= */}
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

        {/* =========================================
            PAGE 3: KURIR LOKAL / DRIVER ("/driver")
            ========================================= */}
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

        {/* =========================================
            PAGE 4: ADMIN HUB ("/admin")
            ========================================= */}
        <Route path="/admin" element={
          <div className="page-container">
            <AdminNavbar 
              currentAdmin={currentAdmin}
              onLogout={() => handleLogout('admin')}
            />

            <main className="main-content">
              <AdminHubPortal
                orders={orders}
                merchants={merchants}
                couriers={couriers}
                onConsolidateOrder={handleConsolidateOrder}
                currentAdmin={currentAdmin}
              />
            </main>
          </div>
        } />

        {/* =========================================
            LOGIN ROUTES PER PERSONA
            ========================================= */}
        <Route path="/login-user" element={
          <LoginPage persona="user" onLoginSuccess={handleLoginSuccess} />
        } />

        <Route path="/login-umkm" element={
          <LoginPage persona="umkm" onLoginSuccess={handleLoginSuccess} />
        } />

        <Route path="/login-driver" element={
          <LoginPage persona="driver" onLoginSuccess={handleLoginSuccess} />
        } />

        <Route path="/login-admin" element={
          <LoginPage persona="admin" onLoginSuccess={handleLoginSuccess} />
        } />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Footer Directory Links */}
      <FooterPortalLinks />
    </div>
  );
}
