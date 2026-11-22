import React from "react";
import { Audio, interpolate, Series, staticFile, useCurrentFrame } from "remotion";
import { Scene1Intro } from "./scenes/Scene1Intro";
import { Scene2Problems } from "./scenes/Scene2Problems";
import { Scene3CrossCart } from "./scenes/Scene3CrossCart";
import { Scene4LogisticsHub } from "./scenes/Scene4LogisticsHub";
import { Scene5Closing } from "./scenes/Scene5Closing";

export const PasarHubComposition: React.FC = () => {
  const frame = useCurrentFrame();

  // Smooth fade-in at the beginning and fade-out at the end
  const volume = interpolate(
    frame,
    [0, 30, 850, 900],
    [0, 0.75, 0.75, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <>
      {/* Background Music from User Upload */}
      <Audio
        src={staticFile("audio.mp3")}
        volume={volume}
      />

      <Series>
        {/* Scene 1: Intro & Hook (Frames 0 - 150 | 5 detik) */}
        <Series.Sequence durationInFrames={150}>
          <Scene1Intro />
        </Series.Sequence>

        {/* Scene 2: Masalah / Latar Belakang (Frames 150 - 330 | 6 detik) */}
        <Series.Sequence durationInFrames={180}>
          <Scene2Problems />
        </Series.Sequence>

        {/* Scene 3: Simulasi UI Aplikasi & Keranjang Bersama (Frames 330 - 570 | 8 detik) */}
        <Series.Sequence durationInFrames={240}>
          <Scene3CrossCart />
        </Series.Sequence>

        {/* Scene 4: Alur Logistik Hub-and-Spoke (Frames 570 - 750 | 6 detik) */}
        <Series.Sequence durationInFrames={180}>
          <Scene4LogisticsHub />
        </Series.Sequence>

        {/* Scene 5: Closing & Call to Action (Frames 750 - 900 | 5 detik) */}
        <Series.Sequence durationInFrames={150}>
          <Scene5Closing />
        </Series.Sequence>
      </Series>
    </>
  );
};
