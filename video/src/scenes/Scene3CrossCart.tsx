import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  ShoppingBag,
  CheckCircle2,
  QrCode,
  ShieldCheck,
  Store,
  Plus,
  Lock,
} from "lucide-react";
import { PasarHubLogo } from "../components/PasarHubLogo";

interface ProductItem {
  id: number;
  name: string;
  merchant: string;
  price: number;
  unit: string;
  tag: string;
  iconEmoji: string;
  bgGrad: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 1,
    name: "Sayur Bayam Segar",
    merchant: "Lapak Bu Siti (Blok B-12)",
    price: 3500,
    unit: "ikat",
    tag: "Sayuran",
    iconEmoji: "🥬",
    bgGrad: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
  },
  {
    id: 2,
    name: "Daging Ayam Broiler",
    merchant: "Lapak Pak Budi (Blok C-04)",
    price: 28000,
    unit: "1 kg",
    tag: "Daging Segar",
    iconEmoji: "🍗",
    bgGrad: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)",
  },
  {
    id: 3,
    name: "Paket Bumbu Dapur",
    merchant: "Lapak Mas Eko (Blok A-08)",
    price: 5000,
    unit: "paket",
    tag: "Bumbu & Rempah",
    iconEmoji: "🧄",
    bgGrad: "linear-gradient(135deg, #FEFCE8 0%, #FEF9C3 100%)",
  },
];

export const Scene3CrossCart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for browser container
  const windowSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Click timing:
  // Item 1 clicked around frame 45
  // Item 2 clicked around frame 85
  // Item 3 clicked around frame 125
  const item1Added = frame >= 48;
  const item2Added = frame >= 88;
  const item3Added = frame >= 128;

  const cartCount = (item1Added ? 1 : 0) + (item2Added ? 1 : 0) + (item3Added ? 1 : 0);

  // Escrow payment modal popup triggered after frame 175
  const modalSpring = spring({
    frame: frame - 175,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Simulated Mouse Cursor Coordinates & Clicks
  // Product 1 button approx X: 370, Y: 390
  // Product 2 button approx X: 580, Y: 390
  // Product 3 button approx X: 790, Y: 390
  // Cart Checkout button approx X: 1100, Y: 570
  let cursorX = 200;
  let cursorY = 200;
  let isClicking = false;

  if (frame < 25) {
    cursorX = interpolate(frame, [0, 25], [150, 360], { extrapolateRight: "clamp" });
    cursorY = interpolate(frame, [0, 25], [180, 480], { extrapolateRight: "clamp" });
  } else if (frame < 55) {
    cursorX = 360;
    cursorY = 480;
    isClicking = frame >= 44 && frame <= 50;
  } else if (frame < 70) {
    cursorX = interpolate(frame, [55, 70], [360, 560], { extrapolateRight: "clamp" });
    cursorY = interpolate(frame, [55, 70], [480, 480], { extrapolateRight: "clamp" });
  } else if (frame < 95) {
    cursorX = 560;
    cursorY = 480;
    isClicking = frame >= 84 && frame <= 90;
  } else if (frame < 110) {
    cursorX = interpolate(frame, [95, 110], [560, 760], { extrapolateRight: "clamp" });
    cursorY = interpolate(frame, [95, 110], [480, 480], { extrapolateRight: "clamp" });
  } else if (frame < 135) {
    cursorX = 760;
    cursorY = 480;
    isClicking = frame >= 124 && frame <= 130;
  } else if (frame < 165) {
    cursorX = interpolate(frame, [135, 165], [760, 1130], { extrapolateRight: "clamp" });
    cursorY = interpolate(frame, [135, 165], [480, 640], { extrapolateRight: "clamp" });
  } else {
    cursorX = 1130;
    cursorY = 640;
    isClicking = frame >= 170 && frame <= 178;
  }

  // Scene fade out
  const sceneOpacity = interpolate(frame, [225, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#F8FAFC",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
        padding: "0 60px",
        opacity: sceneOpacity,
      }}
    >
      {/* Background Graphic */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 10%, rgba(16, 185, 129, 0.08) 0%, transparent 60%),
            linear-gradient(to right, rgba(226, 232, 240, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 232, 240, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
        }}
      />

      {/* Top Banner Feature Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
          zIndex: 10,
        }}
      >
        <span
          style={{
            background: "#ECFDF5",
            border: "1.5px solid #10B981",
            color: "#065F46",
            padding: "6px 18px",
            borderRadius: 9999,
            fontSize: 14,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <ShoppingBag size={16} /> Fitur Unggulan: Keranjang Bersama (Cross-Merchant Cart)
        </span>
      </div>

      {/* Browser Mockup Window */}
      <div
        style={{
          width: 1400,
          height: 740,
          backgroundColor: "#FFFFFF",
          borderRadius: 20,
          border: "1.5px solid #CBD5E1",
          boxShadow: "0 25px 60px rgba(15, 23, 42, 0.12)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          zIndex: 10,
          transform: `scale(${Math.max(0, windowSpring)})`,
          opacity: Math.max(0, windowSpring),
        }}
      >
        {/* Browser Top Navigation Bar */}
        <div
          style={{
            height: 48,
            backgroundColor: "#F1F5F9",
            borderBottom: "1px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
            gap: 16,
          }}
        >
          {/* Mac Dots */}
          <div style={{ display: "flex", gap: 7 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF4444" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#F59E0B" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10B981" }} />
          </div>

          {/* Browser Address Bar */}
          <div
            style={{
              flex: 1,
              maxWidth: 600,
              margin: "0 auto",
              height: 30,
              backgroundColor: "#FFFFFF",
              borderRadius: 8,
              border: "1px solid #CBD5E1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontSize: 13,
              fontWeight: 600,
              color: "#475569",
            }}
          >
            <Lock size={13} color="#10B981" />
            <span>https://pasarhub.id/katalog/pasar-besar-malang</span>
          </div>
        </div>

        {/* Application Header inside Web App */}
        <div
          style={{
            height: 64,
            borderBottom: "1px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            backgroundColor: "#FFFFFF",
          }}
        >
          <PasarHubLogo size={36} showText textSize={22} />

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* Market Pin */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#F8FAFC",
                padding: "6px 14px",
                borderRadius: 9999,
                border: "1px solid #E2E8F0",
                fontSize: 13,
                fontWeight: 700,
                color: "#0F172A",
              }}
            >
              <span>📍 Pasar Besar Malang (Gate 2 Hub)</span>
            </div>

            {/* Cart Icon with Dynamic Badge */}
            <div
              style={{
                position: "relative",
                width: 44,
                height: 44,
                borderRadius: 12,
                background: cartCount > 0 ? "#10B981" : "#F1F5F9",
                color: cartCount > 0 ? "white" : "#64748B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                boxShadow: cartCount > 0 ? "0 4px 12px rgba(16, 185, 129, 0.3)" : "none",
              }}
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#F97316",
                    color: "white",
                    fontSize: 12,
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid white",
                  }}
                >
                  {cartCount}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area: Products on Left (65%), Cart Summary on Right (35%) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            backgroundColor: "#F8FAFC",
            overflow: "hidden",
          }}
        >
          {/* Left Side: Product Catalog */}
          <div
            style={{
              flex: "0 0 65%",
              padding: "24px 28px",
              borderRight: "1.5px solid #E2E8F0",
              overflowY: "hidden",
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", margin: "0 0 4px 0" }}>
                Pilihan Komoditas Segar Hari Ini
              </h3>
              <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>
                Bebas pilih dari lapak mana saja di satu pasar, dikirim sekaligus 1x ongkir!
              </p>
            </div>

            {/* Product Cards Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {PRODUCTS.map((prod, idx) => {
                const isAdded =
                  (idx === 0 && item1Added) ||
                  (idx === 1 && item2Added) ||
                  (idx === 2 && item3Added);

                return (
                  <div
                    key={prod.id}
                    style={{
                      background: "#FFFFFF",
                      borderRadius: 16,
                      border: isAdded ? "2px solid #10B981" : "1px solid #E2E8F0",
                      padding: 16,
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: isAdded
                        ? "0 8px 20px rgba(16, 185, 129, 0.15)"
                        : "0 4px 10px rgba(0,0,0,0.03)",
                      position: "relative",
                    }}
                  >
                    {/* Emoji Banner */}
                    <div
                      style={{
                        height: 100,
                        borderRadius: 12,
                        background: prod.bgGrad,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 48,
                        marginBottom: 12,
                      }}
                    >
                      {prod.iconEmoji}
                    </div>

                    {/* Merchant Tag */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        background: "#F1F5F9",
                        color: "#475569",
                        padding: "2px 8px",
                        borderRadius: 6,
                        fontSize: 10,
                        fontWeight: 700,
                        marginBottom: 6,
                        width: "fit-content",
                      }}
                    >
                      <Store size={11} color="#10B981" />
                      <span>{prod.merchant}</span>
                    </div>

                    {/* Product Name */}
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 800,
                        color: "#0F172A",
                        lineHeight: 1.25,
                        marginBottom: 8,
                      }}
                    >
                      {prod.name}
                    </div>

                    {/* Price */}
                    <div
                      style={{
                        fontSize: 17,
                        fontWeight: 900,
                        color: "#10B981",
                        marginBottom: 14,
                      }}
                    >
                      Rp {prod.price.toLocaleString("id-ID")}
                      <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}>
                        /{prod.unit}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      type="button"
                      style={{
                        background: isAdded ? "#10B981" : "#0F172A",
                        color: "white",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {isAdded ? (
                        <>
                          <CheckCircle2 size={15} /> Masuk Keranjang
                        </>
                      ) : (
                        <>
                          <Plus size={15} /> Tambah
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Shared Cross-Merchant Cart & Checkout Panel */}
          <div
            style={{
              flex: "0 0 35%",
              backgroundColor: "#FFFFFF",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* Cart Title */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: 12,
                  borderBottom: "1.5px solid #F1F5F9",
                  marginBottom: 14,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <ShoppingBag size={20} color="#10B981" />
                  <h4 style={{ fontSize: 17, fontWeight: 800, color: "#0F172A", margin: 0 }}>
                    Keranjang Bersama
                  </h4>
                </div>
                <span
                  style={{
                    background: "#ECFDF5",
                    color: "#059669",
                    padding: "3px 10px",
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  {cartCount} Lapak Berbeda
                </span>
              </div>

              {/* Added Items List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {cartCount === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      color: "#94A3B8",
                      fontSize: 13,
                      padding: "40px 0",
                    }}
                  >
                    Keranjang masih kosong. Pilih produk di sebelah kiri.
                  </div>
                )}

                {item1Added && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "#F8FAFC",
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: "#0F172A" }}>
                        Sayur Bayam Segar
                      </div>
                      <div style={{ fontSize: 11, color: "#64748B" }}>Bu Siti (Blok B-12)</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#10B981" }}>
                      Rp 3.500
                    </div>
                  </div>
                )}

                {item2Added && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "#F8FAFC",
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: "#0F172A" }}>
                        Daging Ayam Broiler
                      </div>
                      <div style={{ fontSize: 11, color: "#64748B" }}>Pak Budi (Blok C-04)</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#10B981" }}>
                      Rp 28.000
                    </div>
                  </div>
                )}

                {item3Added && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "#F8FAFC",
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: "#0F172A" }}>
                        Paket Bumbu Dapur
                      </div>
                      <div style={{ fontSize: 11, color: "#64748B" }}>Mas Eko (Blok A-08)</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#10B981" }}>
                      Rp 5.000
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Checkout & Payment Breakdown */}
            <div
              style={{
                borderTop: "1.5px solid #F1F5F9",
                paddingTop: 14,
              }}
            >
              {/* Subtotal */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: "#64748B",
                  marginBottom: 6,
                }}
              >
                <span>Subtotal (3 Lapak)</span>
                <span style={{ fontWeight: 700, color: "#0F172A" }}>
                  Rp {(item1Added ? 3500 : 0) + (item2Added ? 28000 : 0) + (item3Added ? 5000 : 0)}.000
                </span>
              </div>

              {/* Flat Shipping Highlight (PRD Core Innovation) */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#ECFDF5",
                  border: "1px dashed #10B981",
                  padding: "6px 10px",
                  borderRadius: 8,
                  marginBottom: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14 }}>🚀</span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#065F46" }}>
                    Ongkir Flat Konsolidasi Hub
                  </span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 900, color: "#059669" }}>
                  Rp 3.000
                </span>
              </div>

              {/* Total Bayar */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 14,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>
                  Total 1x Bayar
                </span>
                <span style={{ fontSize: 24, fontWeight: 900, color: "#0F172A" }}>
                  Rp 39.500
                </span>
              </div>

              {/* Single Payment Button via QRIS */}
              <button
                type="button"
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  color: "white",
                  border: "none",
                  padding: "12px 18px",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(16, 185, 129, 0.35)",
                }}
              >
                <QrCode size={18} />
                <span>Bayar via QRIS (Sistem Escrow)</span>
              </button>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  marginTop: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#64748B",
                }}
              >
                <ShieldCheck size={14} color="#10B981" />
                <span>100% Aman: Dana tertahan hingga pesanan Anda terima</span>
              </div>
            </div>
          </div>
        </div>

        {/* QRIS Escrow Payment Success / Modal Overlay */}
        {frame >= 175 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(15, 23, 42, 0.65)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
            }}
          >
            <div
              style={{
                width: 480,
                backgroundColor: "#FFFFFF",
                borderRadius: 20,
                padding: "32px 36px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
                transform: `scale(${Math.max(0, modalSpring)})`,
                opacity: Math.max(0, modalSpring),
              }}
            >
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: 9999,
                  background: "#ECFDF5",
                  border: "3px solid #A7F3D0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <CheckCircle2 size={38} color="#10B981" />
              </div>

              <span
                style={{
                  background: "#FEF9C3",
                  color: "#854D0E",
                  padding: "4px 12px",
                  borderRadius: 9999,
                  fontSize: 12,
                  fontWeight: 800,
                  marginBottom: 8,
                  textTransform: "uppercase",
                }}
              >
                🛡️ Sistem Escrow Otomatis Aktif
              </span>

              <h3 style={{ fontSize: 24, fontWeight: 900, color: "#0F172A", margin: "0 0 8px 0" }}>
                Pembayaran Rp 39.500 Terverifikasi!
              </h3>

              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.45, margin: "0 0 20px 0" }}>
                Pesanan diteruskan ke <strong>3 Lapak</strong>. Dana aman tersimpan di Rekening
                Bersama PasarHub dan baru diteruskan setelah kurir mengantar paket Anda.
              </p>

              <div
                style={{
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: 12,
                  padding: "10px 18px",
                  width: "100%",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#059669",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <span>📦 Otomatis Konsolidasi di Hub Pasar</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Simulated Interactive Mouse Cursor */}
      <div
        style={{
          position: "absolute",
          top: cursorY,
          left: cursorX,
          zIndex: 100,
          pointerEvents: "none",
          transform: `scale(${isClicking ? 0.85 : 1})`,
          transition: "transform 0.08s ease-out",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}
        >
          <path
            d="M5 3L23 15L14 17L9 26L5 3Z"
            fill="#0F172A"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>

        {isClicking && (
          <div
            style={{
              position: "absolute",
              top: -6,
              left: -6,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(16, 185, 129, 0.4)",
              animation: "ping 0.3s ease-out",
            }}
          />
        )}
      </div>
    </div>
  );
};

