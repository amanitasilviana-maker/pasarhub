import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Layers,
  Package,
  Truck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface FlowStep {
  step: string;
  title: string;
  subtitle: string;
  detail: string;
  badge: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  bgLight: string;
}

const STEPS: FlowStep[] = [
  {
    step: "01",
    title: "Pesanan Dipecah ke Lapak",
    subtitle: "Sistem Multi-Vendor Dispatch",
    detail: "Order otomatis dipecah per pedagang via notifikasi audio & WA instan.",
    badge: "Auto Sub-Order Splitting",
    icon: Layers,
    color: "#6366F1",
    bgLight: "#EEF2FF",
  },
  {
    step: "02",
    title: "Konsolidasi di HUB Pasar",
    subtitle: "Titik Kumpul Meja Gate 2",
    detail: "Pedagang setor barang ke Admin Hub. Dicek QC & disatukan dalam 1 totebag.",
    badge: "1 Titik Konsolidasi",
    icon: Package,
    color: "#10B981",
    bgLight: "#ECFDF5",
  },
  {
    step: "03",
    title: "Diantar Kurir Lokal",
    subtitle: "Radius Hiperlokal Cepat",
    detail: "Kurir PasarHub hanya jemput di HUB Pasar & langsung antar ke konsumen.",
    badge: "Ongkir Flat Rp 3.000",
    icon: Truck,
    color: "#F97316",
    bgLight: "#FFF7ED",
  },
  {
    step: "04",
    title: "Barang Diterima & Dana Cair",
    subtitle: "Pencairan Escrow 100%",
    detail: "Konsumen verifikasi paket. Escrow rilis dana utuh tanpa potongan ke lapak.",
    badge: "0% Potongan Komisi",
    icon: CheckCircle2,
    color: "#059669",
    bgLight: "#D1FAE5",
  },
];

export const Scene4LogisticsHub: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header springs
  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Flow animated progress (0 to 100%)
  const flowProgress = interpolate(frame, [15, 120], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene fade out
  const sceneOpacity = interpolate(frame, [165, 180], [1, 0], {
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
        padding: "0 80px",
        opacity: sceneOpacity,
      }}
    >
      {/* Background Graphic */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 30%, rgba(16, 185, 129, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 10% 90%, rgba(99, 102, 241, 0.06) 0%, transparent 40%),
            linear-gradient(to right, rgba(226, 232, 240, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 232, 240, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 48px 48px, 48px 48px",
        }}
      />

      {/* Header Container */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 44,
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            transform: `scale(${Math.max(0, headerSpring)})`,
            opacity: Math.max(0, headerSpring),
            background: "#ECFDF5",
            border: "1.5px solid #A7F3D0",
            padding: "6px 18px",
            borderRadius: 9999,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
          }}
        >
          <Sparkles size={16} color="#059669" />
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: "#065F46",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Arsitektur Logistik Cerdas
          </span>
        </div>

        <h2
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: "#0F172A",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            margin: "0 0 12px 0",
            transform: `translateY(${interpolate(
              headerSpring,
              [0, 1],
              [25, 0]
            )}px)`,
            opacity: Math.max(0, headerSpring),
          }}
        >
          Alur Logistik Hub-and-Spoke PasarHub
        </h2>

        <p
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#64748B",
            margin: 0,
            transform: `translateY(${interpolate(
              headerSpring,
              [0, 1],
              [15, 0]
            )}px)`,
            opacity: Math.max(0, headerSpring),
          }}
        >
          Kurir tidak perlu keliling antar lapak — semua terpusat di meja konsolidasi
        </p>
      </div>

      {/* 4 Steps Horizontal Flow */}
      <div
        style={{
          width: "100%",
          maxWidth: 1360,
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Animated Connector Line across all 4 nodes */}
        <div
          style={{
            position: "absolute",
            top: 75,
            left: 120,
            right: 120,
            height: 6,
            background: "#E2E8F0",
            borderRadius: 9999,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: `${flowProgress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #6366F1, #10B981, #F97316, #059669)",
              borderRadius: 9999,
              boxShadow: "0 0 16px rgba(16, 185, 129, 0.5)",
              transition: "width 0.1s linear",
            }}
          />
        </div>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            position: "relative",
            zIndex: 2,
          }}
        >
          {STEPS.map((item, idx) => {
            const delay = 15 + idx * 25;
            const cardSpring = spring({
              frame: frame - delay,
              fps,
              config: { damping: 14, stiffness: 100 },
            });

            const isPassed = frame >= delay + 10;
            const IconComp = item.icon;

            return (
              <div
                key={item.step}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 20,
                  border: isPassed
                    ? `2px solid ${item.color}`
                    : "1.5px solid #E2E8F0",
                  padding: "24px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  boxShadow: isPassed
                    ? `0 12px 30px ${item.color}20`
                    : "0 6px 20px rgba(0,0,0,0.03)",
                  transform: `translateY(${interpolate(
                    cardSpring,
                    [0, 1],
                    [40, 0]
                  )}px) scale(${interpolate(cardSpring, [0, 1], [0.9, 1])})`,
                  opacity: Math.max(0, cardSpring),
                  position: "relative",
                }}
              >
                {/* Step Number Top Badge */}
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: item.bgLight,
                    border: `3px solid ${isPassed ? item.color : "#E2E8F0"}`,
                    color: item.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                    boxShadow: isPassed ? `0 0 15px ${item.color}35` : "none",
                  }}
                >
                  <IconComp size={28} color={item.color} />
                </div>

                {/* Step Number Tag */}
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 900,
                    color: item.color,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Tahap {item.step}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#0F172A",
                    lineHeight: 1.3,
                    margin: "0 0 8px 0",
                    minHeight: 46,
                  }}
                >
                  {item.title}
                </h3>

                {/* Subtitle / Description */}
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#64748B",
                    lineHeight: 1.45,
                    margin: "0 0 16px 0",
                    minHeight: 56,
                  }}
                >
                  {item.detail}
                </p>

                {/* Feature Pill */}
                <div
                  style={{
                    background: item.bgLight,
                    color: item.color,
                    padding: "5px 12px",
                    borderRadius: 9999,
                    fontSize: 11,
                    fontWeight: 800,
                    marginTop: "auto",
                  }}
                >
                  {item.badge}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div
        style={{
          marginTop: 40,
          background: "#FFFFFF",
          border: "1.5px solid #E2E8F0",
          borderRadius: 16,
          padding: "12px 28px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>
          🚀 Hasil Konsolidasi:
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#10B981" }}>
          ✓ Ongkir Flat Rp 3.000
        </span>
        <span style={{ color: "#CBD5E1" }}>•</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#0284C7" }}>
          ✓ Waktu Antar &lt; 25 Menit
        </span>
        <span style={{ color: "#CBD5E1" }}>•</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#F97316" }}>
          ✓ Beban Logistik Terpangkas 70%
        </span>
      </div>
    </div>
  );
};

