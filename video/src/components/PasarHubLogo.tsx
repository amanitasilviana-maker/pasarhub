import React from "react";
import { Img, staticFile } from "remotion";

interface PasarHubLogoProps {
  size?: number;
  showText?: boolean;
  textSize?: number;
}

export const PasarHubLogo: React.FC<PasarHubLogoProps> = ({
  size = 80,
  showText = false,
  textSize = 36,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {/* Official PasarHub Logo Image */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.22),
          overflow: "hidden",
          boxShadow: "0 12px 30px rgba(16, 185, 129, 0.25)",
          backgroundColor: "#FFFFFF",
          border: "2px solid rgba(226, 232, 240, 0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Img
          src={staticFile("logo.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {showText && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: textSize,
              fontWeight: 900,
              color: "#0F172A",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Pasar<span style={{ color: "#10B981" }}>Hub</span>
          </div>
          <div
            style={{
              fontSize: Math.round(textSize * 0.32),
              fontWeight: 700,
              color: "#F97316",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginTop: 4,
            }}
          >
            Konsolidasi Logistik Pasar
          </div>
        </div>
      )}
    </div>
  );
};
