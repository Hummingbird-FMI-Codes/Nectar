import { memo } from "react";
import { HeatMapBase } from "./BaseHeatMap";
import { Location } from "./types";
import { ImageSize } from "../ImageVisualisation/ImageVisualisation";

export const HeatMap = memo(function HeatMap(props: { points: Location[] }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "5px",
        width: "100%",
      }}
    >
      <HeatMapBase
        width="100%"
        height={`${ImageSize}px`}
        points={props.points}
      />
    </div>
  );
});
