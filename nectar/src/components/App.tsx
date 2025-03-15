import { useCallback, useState } from "react";
import { UploadPhoto } from "./UploadPhoto/UploadPhoto";
import { ImageWithoutData } from "../types/ImageUpload";
import { HeatMapBase } from "./HeatMap/BaseHeatMap";
import { FMI_location } from "./HeatMap/FMI_location";
import { HeatMap } from "./HeatMap/HeatMap";
import { ConvertImagesToBase64 } from "./ConvertImageToBase64/ConvertImagesToBase64";
import { Black } from "../consts";
import { ImageVisualisation } from "./ImageVisualisation/ImageVisualisation";
import { Location } from "./HeatMap/types";

function App() {
  const [images, setImages] = useState<ImageWithoutData[]>([]);

  const [heatmapPoints, setHeatmapPoints] = useState([FMI_location]);

  const [currentImage, setCurrentImage] = useState<
    ImageWithoutData | undefined
  >();

  const handleUpload = () => {
    setCurrentImage(images[0]);
    setImages(images.slice(1));
  };

  const setLocation = useCallback((location: Location) => {
    setHeatmapPoints((points) => [...points, location]);
  }, []);

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
      <h2 style={{ color: "white" }}>Ant Radar</h2>

      <UploadPhoto data={images} setData={setImages} upload={handleUpload} />

      <ImageVisualisation
        image={currentImage}
        loadNext={handleUpload}
        setLocation={setLocation}
      />

      <HeatMap points={heatmapPoints} />
    </div>
  );
}

export default App;
