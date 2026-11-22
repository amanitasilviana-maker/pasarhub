import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PasarHubLogo } from "../components/PasarHubLogo";
import { ShoppingBag, Truck, ShieldCheck, Sparkles } from "lucide-react";

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation for Logo Scale & Bounce
  const logoSpring = spring({
    frame,
    fps,
    config: {
      damping: 12,
      mass: 0.8,
      stiffness: 110,
    },
  });

  // Spring for main Title
  const titleSpring = spring({
    frame: frame - 15,
    fps,
    config: {
      damping: 14,
      mass: 0.9,
      stiffness: 120,
    },
  });

  // Spring for Subtitle
  const subtitleSpring = spring({
    frame: frame - 30,
    fps,
    config: {
      damping: 15,
      stiffness: 100,
    },
  });

  // Pills appearance
  const pillsSpring = spring({
    frame: frame - 45,
    fps,
    config: {
      damping: 15,
      stiffness: 90,
    },
  });

  // Scene fade out towards frame 135-150
  const sceneOpacity = interpolate(frame, [135, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle background float
  const floatY = Math.sin(frame / 20) * 8;

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
        opacity: sceneOpacity,
      }}
    >
      {/* Background Decorative Tech Grid & Gradients */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 25%, rgba(16, 185, 129, 0.12) 0%, transparent 55%),
            radial-gradient(circle at 85% 75%, rgba(249, 115, 22, 0.08) 0%, transparent 45%),
            linear-gradient(to right, rgba(226, 232, 240, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 232, 240, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 48px 48px, 48px 48px",
          opacity: 0.85,
        }}
      />

      {/* Floating Accent Circles */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "14%",
          width: 240,
          height: 240,
          borderRadius: 9999,
          background: "rgba(16, 185, 129, 0.08)",
          filter: "blur(60px)",
          transform: `translateY(${floatY}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "12%",
          width: 280,
          height: 280,
          borderRadius: 9999,
          background: "rgba(249, 115, 22, 0.08)",
          filter: "blur(70px)",
          transform: `translateY(${-floatY}px)`,
        }}
      />

      {/* Main Content Box */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: 1100,
          padding: "0 40px",
        }}
      >
        {/* Top Innovation Pill */}
        <div
          style={{
            transform: `scale(${Math.max(0, pillsSpring)}) translateY(${interpolate(
              pillsSpring,
              [0, 1],
              [-15, 0]
            )}px)`,
            opacity: Math.max(0, pillsSpring),
            background: "#ECFDF5",
            border: "1.5px solid #A7F3D0",
            padding: "8px 20px",
            borderRadius: 9999,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 28,
            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.12)",
          }}
        >
          <Sparkles size={18} color="#059669" />
          <span
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: "#065F46",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Platform Otonom Pasar Tradisional Masa Depan
          </span>
        </div>

        {/* Central Animated Vector Logo */}
        <div
          style={{
            transform: `scale(${Math.max(0, logoSpring)}) translateY(${floatY}px)`,
            marginBottom: 24,
          }}
        >
          <PasarHubLogo size={140} />
        </div>

        {/* Large Startup Title */}
        <h1
          style={{
            fontSize: 84,
            fontWeight: 900,
            color: "#0F172A",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            margin: "0 0 16px 0",
            transform: `translateY(${interpolate(
              titleSpring,
              [0, 1],
              [40, 0]
            )}px)`,
            opacity: Math.max(0, titleSpring),
          }}
        >
          Pasar<span style={{ color: "#10B981" }}>Hub</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: "#475569",
            lineHeight: 1.45,
            maxWidth: 820,
            margin: "0 0 36px 0",
            transform: `translateY(${interpolate(
              subtitleSpring,
              [0, 1],
              [30, 0]
            )}px)`,
            opacity: Math.max(0, subtitleSpring),
          }}
        >
          Digitalisasi Pasar Tradisional Otonom Berbasis{" "}
          <span style={{ color: "#0F172A", fontWeight: 800 }}>
            Konsolidasi Logistik
          </span>
        </p>

        {/* Value Prop Badges */}
        <div
          style={{
            display: "flex",
            gap: 16,
            transform: `translateY(${interpolate(
              pillsSpring,
              [0, 1],
              [20, 0]
            )}px)`,
            opacity: Math.max(0, pillsSpring),
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: 14,
              padding: "10px 18px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.04)",
            }}
          >
            <ShoppingBag size={20} color="#10B981" />
            <span style={{ fontSize: 16, fontWeight: 700, color: "#1E293B" }}>
              Multi-Lapak 1 Keranjang
            </span>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: 14,
              padding: "10px 18px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.04)",
            }}
          >
            <Truck size={20} color="#F97316" />
            <span style={{ fontSize: 16, fontWeight: 700, color: "#1E293B" }}>
              Ongkir Flat Hiperlokal
            </span>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: 14,
              padding: "10px 18px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.04)",
            }}
          >
            <ShieldCheck size={20} color="#0284C7" />
            <span style={{ fontSize: 16, fontWeight: 700, color: "#1E293B" }}>
              Sistem Escrow Terpercaya
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

