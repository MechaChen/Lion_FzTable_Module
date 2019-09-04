import React from "react";
import FzTable from "./components/FzTable";
import "./App.css";

function App() {
  const count = {
    colNum: 4,
    slide: 2
  };
  return (
    <div className="App">
      <FzTable count={count} />
    </div>
  );
}

export default App;
