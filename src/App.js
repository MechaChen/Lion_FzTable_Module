import React from "react";
import FzTable from "./components/FzTable";
import "./App.css";

function App() {
  const count = {
    show: 4,
    slide: 1
  };
  const whenClick = $element => {
    console.log($element.innerText);
  };
  return (
    <div className="App">
      <FzTable count={count} whenClick={whenClick} />
    </div>
  );
}

export default App;
