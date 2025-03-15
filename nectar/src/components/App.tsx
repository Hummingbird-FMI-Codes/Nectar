import { useState } from "react";
import { ConvertImagesToBase64 } from "./ConvertImageToBase64/ConvertImagesToBase64";
import { UploadPhoto } from "./UploadPhoto/UploadPhoto";
import { ImageWithoutData } from "../types/ImageUpload";

function App() {
  const [images, setImages] = useState<ImageWithoutData[]>([]);

  return (
    <div
      style={{
        backgroundColor: "lightblue",
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ConvertImagesToBase64 />
      <UploadPhoto data={images} setData={setImages} />
    </div>
  );
}

export default App;
