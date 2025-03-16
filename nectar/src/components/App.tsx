import { useCallback, useState } from "react";
import { UploadPhoto } from "./UploadPhoto/UploadPhoto";
import { ImageWithoutData } from "../types/ImageUpload";
import { FMI_location } from "./HeatMap/FMI_location";
import { HeatMap } from "./HeatMap/HeatMap";
import { Black } from "../consts";
import { ImageVisualisation } from "./ImageVisualisation/ImageVisualisation";
import { Location } from "./HeatMap/types";
import { Preview } from "./UploadPhoto/Preview";
import { ConvertImagesToBase64 } from "./ConvertImageToBase64/ConvertImagesToBase64";

function App() {
  const [images, setImages] = useState<ImageWithoutData[]>([]);

  const [heatmapPoints, setHeatmapPoints] = useState([]);

  const [currentImage, setCurrentImage] = useState<
    ImageWithoutData | undefined
  >();

  const handleUpload = () => {
    setCurrentImage(images[0]);
  };

  const loadNext = () => {
    setImages(images.slice(1));
    setCurrentImage(images[1]);
  };

  const setLocation = useCallback((location: Location) => {
    // setHeatmapPoints((points) => [...points, location]);
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
      <h1 style={{ color: "white" }}>Ant Radar</h1>

      <Preview data={images} />

      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        {currentImage ? (
          <ImageVisualisation
            image={currentImage}
            loadNext={loadNext}
            setLocation={setLocation}
          />
        ) : (
          <UploadPhoto
            data={images}
            setData={setImages}
            upload={handleUpload}
          />
        )}

        <HeatMap points={heatmapPoints} />
      </div>
    </div>
  );
}

export default App;
