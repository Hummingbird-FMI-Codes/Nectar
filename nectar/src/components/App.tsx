import { ConvertImagesToBase64 } from "./ConvertImageToBase64/ConvertImagesToBase64";
import { UploadPhoto } from "./UploadPhoto/UploadPhoto";

function App() {
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
      <UploadPhoto />
    </div>
  );
}

export default App;
