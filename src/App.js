import "./App.css";
import ReactGA from "react-ga";
import IntroScreen from "./components/IntroScreen";
import {useEffect, useState } from "react";
import React from "react";
import Rock from "./components/Rock";
import ShareFooter from "./components/ShareFooter";

ReactGA.initialize("G-LVL27T0XYL");

function App(props) {
  useEffect(() => {
    // Track initial page load
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const [rock, setRock] = useState(false);
  // const [share, setShare] = useState(false);
  function RockHandler(e) {
    setTimeout(() => {
      setRock(true);
      // Track state change to rock=true
      ReactGA.event({
        category: "User",
        action: "Rockrolled"
      });
    }, 1500);
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
