import React from "react";
import styles from "./Rock.modules.css";
import Sound from "react-sound";
import Song from '../audio/Rock Theme.mp3'
import { useState } from "react";

function Rock() {
    const [isPlaying, setIsPlaying] = useState(true);
    function handleSongPlaying() {
        setTimeout(()=> {setIsPlaying(false)}, 6000);
    }

  return (
    <>
      <img
        src={
          "https://cdn.images.express.co.uk/img/dynamic/171/590x/The-Rock-1186953.jpg?r=1570301135651"
        }
      ></img>
      <Sound
        url={Song}
        playStatus={isPlaying? Sound.status.PLAYING : Sound.status.STOPPED}
        playFromPosition={5000}
        onPlaying={handleSongPlaying}
      ></Sound>
      <h2>IT DOESN'T MATTER HOW YOU FEEL</h2>
    </>
  );
}

export default Rock;
