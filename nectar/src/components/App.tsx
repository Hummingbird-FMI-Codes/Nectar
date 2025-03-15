import { useState } from "react";
import { UploadPhoto } from "./UploadPhoto/UploadPhoto";
import { ImageWithoutData } from "../types/ImageUpload";
import { HeatMapBase } from "./HeatMap/BaseHeatMap";
import { FMI_location } from "./HeatMap/FMI_location";
import { HeatMap } from "./HeatMap/HeatMap";
import { ConvertImagesToBase64 } from "./ConvertImageToBase64/ConvertImagesToBase64";
import { Black } from "../consts";

function App() {
  const [images, setImages] = useState<ImageWithoutData[]>([]);

  const [heatmapPoints, setHeatmapPoints] = useState([FMI_location]);

  return (
    <div
      style={{
        backgroundColor: Black,
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <UploadPhoto data={images} setData={setImages} />

      {/* <HeatMap points={heatmapPoints} /> */}

      {/* <button
        onClick={() => {
          setHeatmapPoints([
            ...heatmapPoints,
            {
              lat: FMI_location.lat + Math.random() * 0.0005,
              lng: FMI_location.lng + Math.random() * 0.0005,
            },
          ]);
        }}
      /> */}
    </div>
  );
}

export default App;
