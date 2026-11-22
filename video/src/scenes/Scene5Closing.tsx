import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PasarHubLogo } from "../components/PasarHubLogo";
import {
  Percent,
  RefreshCw,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Award,
} from "lucide-react";

export const Scene5Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Headline entrance
  const headlineSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Impact pillars entrance
  const pillarsSpring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 14, stiffness: 95 },
  });

  // CTA button entrance
  const ctaSpring = spring({
    frame: frame - 44,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Subtle floating motion
  const floatOffset = Math.sin(frame / 20) * 6;

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
      }}
    >
      {/* Background Graphic */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 85% 85%, rgba(249, 115, 22, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 15% 85%, rgba(2, 132, 199, 0.08) 0%, transparent 45%),
            linear-gradient(to right, rgba(226, 232, 240, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 232, 240, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 100% 100%, 48px 48px, 48px 48px",
        }}
      />

      {/* Main Closing Container */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: 1080,
        }}
      >
        {/* Animated Central Logo */}
        <div
          style={{
            transform: `scale(${Math.max(0, logoSpring)}) translateY(${floatOffset}px)`,
            marginBottom: 20,
          }}
        >
          <PasarHubLogo size={130} />
        </div>

        {/* Brand Name */}
        <div
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: "#0F172A",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            marginBottom: 12,
            transform: `translateY(${interpolate(
              headlineSpring,
              [0, 1],
              [20, 0]
            )}px)`,
            opacity: Math.max(0, headlineSpring),
          }}
        >
          Pasar<span style={{ color: "#10B981" }}>Hub</span>
        </div>

        {/* Closing Main Statement */}
        <h2
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: "#0F172A",
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            margin: "0 0 32px 0",
            transform: `translateY(${interpolate(
              headlineSpring,
              [0, 1],
              [25, 0]
            )}px)`,
            opacity: Math.max(0, headlineSpring),
          }}
        >
          Belanja Pasar Tradisional,{" "}
          <span style={{ color: "#10B981" }}>Praktis</span> &amp;{" "}
          <span style={{ color: "#F97316" }}>Aman</span>
        </h2>

        {/* 3 Impact Pillars Required by Prompt */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            width: "100%",
            marginBottom: 36,
            transform: `translateY(${interpolate(
              pillarsSpring,
              [0, 1],
              [30, 0]
            )}px)`,
            opacity: Math.max(0, pillarsSpring),
          }}
        >
          {/* Pillar 1 */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #A7F3D0",
              borderRadius: 18,
              padding: "18px 24px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 6px 20px rgba(16, 185, 129, 0.08)",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "#ECFDF5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Percent size={24} color="#10B981" />
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#059669", textTransform: "uppercase" }}>
                Biaya Platform
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>
                Komisi Rendah (2-5%)
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #FED7AA",
              borderRadius: 18,
              padding: "18px 24px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 6px 20px rgba(249, 115, 22, 0.08)",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "#FFF7ED",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <RefreshCw size={24} color="#F97316" />
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#EA580C", textTransform: "uppercase" }}>
                Dampak Lokal
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>
                Ekonomi Sirkular
              </div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #BAE6FD",
              borderRadius: 18,
              padding: "18px 24px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 6px 20px rgba(2, 132, 199, 0.08)",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "#F0F9FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <TrendingUp size={24} color="#0284C7" />
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0284C7", textTransform: "uppercase" }}>
                Pemberdayaan
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>
                UMKM Naik Kelas
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Button & Website Link */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            transform: `scale(${Math.max(0, ctaSpring)})`,
            opacity: Math.max(0, ctaSpring),
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              color: "white",
              padding: "16px 36px",
              borderRadius: 14,
              fontSize: 18,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: "0 10px 25px rgba(16, 185, 129, 0.35)",
              cursor: "pointer",
            }}
          >
            <span>Kunjungi &amp; Coba PasarHub</span>
            <ArrowRight size={20} />
          </div>

          <div
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              color: "#0F172A",
              padding: "16px 28px",
              borderRadius: 14,
              fontSize: 18,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 6px 15px rgba(0,0,0,0.04)",
            }}
          >
            <span>🌐 pasarhub.id</span>
          </div>
        </div>
      </div>
    </div>
  );
};

