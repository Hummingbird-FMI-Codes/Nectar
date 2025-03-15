import { UploadPhoto } from "./UploadPhoto/UploadPhoto";

function App() {
  return (
    <>
      <div
        style={{
          backgroundColor: "lightblue",
          display: "flex",
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UploadPhoto />
      </div>
    </>
  );
}

export default App;
