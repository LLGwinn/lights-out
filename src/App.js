import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <h1 className="App-h1">Lights Out!</h1>
      <Board nrows={5} ncols={5} chanceLightStartsOn={80} />
    </div>
  );
}

export default App;
