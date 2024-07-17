// src/App.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from './utils/analytics';
import IntroScreen from './components/IntroScreen';
import Rock from './components/Rock';
import ShareFooter from './components/ShareFooter';
import './App.css';

function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-LVL27T0XYL', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
}

function App() {
  usePageTracking();

  const [rock, setRock] = useState(false);

  function RockHandler(e) {
    setTimeout(() => {
      setRock(true);
      trackEvent('rockrolled', 'engagement', 'rockroll_label', 1);
    }, 1500);
  }

  return (
    <div className="App">
      {!rock && <IntroScreen showRock={RockHandler} />}
      {!rock && <ShareFooter showTry={false} />}
      {rock && <Rock hideRock={() => setRock(false)} />}
    </div>
  );
}

export default App;
