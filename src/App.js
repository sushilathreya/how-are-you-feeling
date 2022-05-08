import "./App.css";
import IntroScreen from "./components/IntroScreen";
import { useState } from "react";
import React from "react";
import Rock from "./components/Rock";
import ShareFooter from "./components/ShareFooter";

function App(props) {
  const [rock, setRock] = useState(false);
  const [share, setShare] = useState(false);
  function RockHandler(e) {
    const myTimeout = setTimeout(() => setRock(true), 1000);
  }
  return (
    <div className="App">
      {!rock && <IntroScreen showRock={RockHandler} />}
      {!rock && <ShareFooter/>}
      {rock && <Rock />}
    </div>
  );
}

export default App;
