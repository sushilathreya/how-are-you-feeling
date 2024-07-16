import "./App.css";
import IntroScreen from "./components/IntroScreen";
import { useState } from "react";
import React from "react";
import Rock from "./components/Rock";
import ShareFooter from "./components/ShareFooter";

function App(props) {
  const [rock, setRock] = useState(false);
  // const [share, setShare] = useState(false);
  function RockHandler(e) {
    setTimeout(() => setRock(true), 1500);
  }
  return (
    <div className="App">
      {!rock && <IntroScreen showRock={RockHandler} />}
      {!rock && <ShareFooter showTry={false}/>}
      {rock && <Rock hideRock={()=> setRock(false)}/>}
    </div>
  );
}

export default App;
