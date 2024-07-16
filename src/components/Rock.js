import React, { useEffect, useState } from "react";
import styles from "./Rock.module.css";
import { Howl } from "howler";
import Song from "../audio/Rock.mp3";
import Card from "./Card";
import ShareFooter from "./ShareFooter";

function Rock(props) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isShare, setIsShare] = useState(false);

  useEffect(() => {
    const sound = new Howl({
      src: [Song],
      volume: 0.5,
      onend: () => {
        setIsPlaying(false);
        setIsShare(true);
      },
    });

    if (isPlaying) {
      sound.play();
      setTimeout(() => {
        sound.stop();
        setIsPlaying(false);
        setIsShare(true);
      }, 8500);
    }

    return () => {
      sound.unload();
    };
  }, [isPlaying]);

  return (
    <div className={styles.rockContainer}>
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
      </div>
      {/* <div className="try-again-container">
        <button onClick={props.hideRock}>Try again</button>
      </div> */}
      {isShare && <ShareFooter showTry={true} hideRock={props.hideRock}/>}
    </div>
  );
}

export default Rock;
