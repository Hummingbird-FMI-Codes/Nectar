import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

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
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
