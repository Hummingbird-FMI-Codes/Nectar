import { useState } from "react";
import { ConvertImagesToBase64 } from "./ConvertImageToBase64/ConvertImagesToBase64";
import { UploadPhoto } from "./UploadPhoto/UploadPhoto";
import { ImageWithoutData } from "../types/ImageUpload";
import { HeatMapBase } from "./HeatMap/BaseHeatMap";
import { FMI_location } from "./HeatMap/FMI_location";

function App() {
  const [images, setImages] = useState<ImageWithoutData[]>([]);

  const [heatmapPoints, setHeatmapPoints] = useState([FMI_location]);

  return (
    <div
      style={{
        backgroundColor: "lightblue",
        width: "100vw", // Full width of viewport
        height: "100vh", // Full height of viewport
        display: "flex",
        justifyContent: "center", // Centers horizontally
        alignItems: "center", // Centers vertically
      }}
    >
      {/* <ConvertImagesToBase64 />
      <UploadPhoto data={images} setData={setImages} /> */}

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          width: "100%",
        }}
      >
        <HeatMapBase width="100%" height="700px" points={heatmapPoints} />
      </div>

      <button
        onClick={() => {
          setHeatmapPoints([
            ...heatmapPoints,
            {
              lat: FMI_location.lat + Math.random() * 0.0005,
              lng: FMI_location.lng + Math.random() * 0.0005,
            },
          ]);
        }}
      />
    </div>
  );
}

export default App;
