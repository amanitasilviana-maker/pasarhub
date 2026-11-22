import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  CreditCard,
  Truck,
  FileQuestion,
  Clock,
  AlertTriangle,
  TrendingDown,
} from "lucide-react";

interface ProblemItem {
  percentage: string;
  value: number;
  title: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  accentBg: string;
}

const PROBLEMS: ProblemItem[] = [
  {
    percentage: "56,3%",
    value: 56.3,
    title: "Pembayaran Digital Terbatas",
    desc: "Mayoritas pedagang hanya menerima tunai, menyulitkan transaksi non-tunai.",
    icon: CreditCard,
    color: "#EF4444",
    accentBg: "#FEE2E2",
  },
  {
    percentage: "50,0%",
    value: 50.0,
    title: "Ongkir E-Commerce Nasional Mahal",
    desc: "Biaya logistik kurir reguler terlalu tinggi untuk belanjaan pasar harian.",
    icon: Truck,
    color: "#F97316",
    accentBg: "#FFEDD5",
  },
  {
    percentage: "43,8%",
    value: 43.8,
    title: "Tidak Ada Katalog & Harga Pasti",
    desc: "Harga fluktuatif tanpa transparansi, tidak ada daftar stok digital lapak.",
    icon: FileQuestion,
    color: "#EAB308",
    accentBg: "#FEF9C3",
  },
  {
    percentage: "37,5%",
    value: 37.5,
    title: "Respon Penjual via Chat Lambat",
    desc: "Pedagang sibuk melayani pembeli fisik sehingga chat online lambat dibalas.",
    icon: Clock,
    color: "#6366F1",
    accentBg: "#EEF2FF",
  },
];

export const Scene2Problems: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header springs
  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const subHeaderSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 110 },
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
      {/* Background Subtle Tech Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.06) 0%, transparent 45%),
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
            background: "#FEF2F2",
            border: "1.5px solid #FCA5A5",
            padding: "6px 18px",
            borderRadius: 9999,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
          }}
        >
          <AlertTriangle size={16} color="#DC2626" />
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: "#991B1B",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Fakta Lapangan &amp; Masalah Utama
          </span>
        </div>

        <h2
          style={{
            fontSize: 50,
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
          Kendala Belanja Pasar Tradisional Saat Ini
        </h2>

        <p
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#64748B",
            margin: 0,
            transform: `translateY(${interpolate(
              subHeaderSpring,
              [0, 1],
              [20, 0]
            )}px)`,
            opacity: Math.max(0, subHeaderSpring),
          }}
        >
          Survei terhadap 120+ responden konsumen &amp; pedagang pasar tradisional
        </p>
      </div>

      {/* 4 Cards Grid - 2x2 Layout with Staggered Entrance */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 24,
          width: "100%",
          maxWidth: 1240,
          position: "relative",
          zIndex: 10,
        }}
      >
        {PROBLEMS.map((problem, index) => {
          // Staggered card spring
          const delay = 18 + index * 14;
          const cardSpring = spring({
            frame: frame - delay,
            fps,
            config: {
              damping: 14,
              stiffness: 110,
              mass: 0.8,
            },
          });

          // Metric bar animation
          const progress = interpolate(
            frame,
            [delay + 10, delay + 35],
            [0, problem.value],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          const IconComponent = problem.icon;

          return (
            <div
              key={problem.title}
              style={{
                background: "#FFFFFF",
                borderRadius: 20,
                border: "1.5px solid #E2E8F0",
                padding: "26px 30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 8px 30px rgba(15, 23, 42, 0.05)",
                transform: `translateY(${interpolate(
                  cardSpring,
                  [0, 1],
                  [40, 0]
                )}px) scale(${interpolate(cardSpring, [0, 1], [0.92, 1])})`,
                opacity: Math.max(0, cardSpring),
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top Accent Strip */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: problem.color,
                }}
              />

              {/* Card Top Row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: problem.accentBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconComponent size={28} color={problem.color} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: "#0F172A",
                        margin: 0,
                        lineHeight: 1.25,
                      }}
                    >
                      {problem.title}
                    </h3>
                  </div>
                </div>

                {/* Big Stat Pill */}
                <div
                  style={{
                    background: problem.accentBg,
                    padding: "6px 14px",
                    borderRadius: 9999,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <TrendingDown size={18} color={problem.color} />
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 900,
                      color: problem.color,
                      fontFamily: "monospace",
                    }}
                  >
                    {problem.percentage}
                  </span>
                </div>
              </div>

              {/* Problem Description */}
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#64748B",
                  lineHeight: 1.45,
                  margin: "0 0 18px 0",
                }}
              >
                {problem.desc}
              </p>

              {/* Progress Bar Visualizer */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#94A3B8",
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  <span>Tingkat Keparahan Kendala</span>
                  <span style={{ color: problem.color }}>
                    {Math.round(progress)}% Responden
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 8,
                    backgroundColor: "#F1F5F9",
                    borderRadius: 9999,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                      backgroundColor: problem.color,
                      borderRadius: 9999,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

