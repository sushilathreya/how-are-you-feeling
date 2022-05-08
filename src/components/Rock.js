import React from "react";
import styles from "./Rock.module.css";
import Sound from "react-sound";
import Song from "../audio/Rock.mp3";
import { useState } from "react";
import Card from "./Card";
import ShareFooter from "./ShareFooter";

function Rock(props) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isShare, setIsShare] = useState(false);
  function handleSongPlaying() {
    setTimeout(() => {
      setIsPlaying(false);
      setIsShare(true);
    }, 8500);
  }
  return (
    <div>
      <div className={styles.rock}>
        <Card>
          <img
            src={
              "https://i.pinimg.com/736x/76/95/75/76957518272bac72ea5dcf99bf1eba3d--the-rock-evolution.jpg"
            }
            className={styles.image}
            alt="It Doesn't Matter How You Feel - The Rock"
          ></img>
          <h2>IT DOESN'T MATTER HOW YOU FEEL</h2>
        </Card>

        <Sound
          url={Song}
          playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
          playFromPosition={0}
          onPlaying={handleSongPlaying}
          volume={50}
        ></Sound>
      </div>
      {isShare && <ShareFooter />}
    </div>
  );
}

export default Rock;
