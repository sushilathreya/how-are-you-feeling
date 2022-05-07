import "./App.css";
import IntroScreen from "./components/IntroScreen";
import { useState } from "react";
import React from "react";
import Rock from "./components/Rock"

function App(props) {
  const [rock, setRock] = useState(false);
  function RockHandler(e) {
    setTimeout(()=> setRock(true), 1000)
  }
  return (
    <div className="App">
      {!rock && <IntroScreen showRock = {RockHandler}/>}
      {rock && <Rock />}
    </div>
  );
}

export default App;
