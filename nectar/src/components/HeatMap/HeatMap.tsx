import { memo } from "react";
import { HeatMapBase } from "./BaseHeatMap";
import { Location } from "./types";

export const HeatMap = memo(function HeatMap(props: { points: Location[] }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        width: "100%",
      }}
    >
      <HeatMapBase width="100%" height="700px" points={props.points} />
    </div>
  );
});
