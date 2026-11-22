import React from "react";
import { Composition } from "remotion";
import { PasarHubComposition } from "./Composition";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="PasarHubDemo"
        component={PasarHubComposition}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};

