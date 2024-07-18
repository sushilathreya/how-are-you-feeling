import React from "react";
import styles from "./IntroScreen.module.css";

function IntroScreen(props) {
  return (
    <div className={styles.container}>
      <h1>How are you feeling?</h1>
      <input
        type={"text"}
        placeholder={"I'm feeeeeeling good..."}
        onChange={props.showRock}
        autoFocus
      ></input>
      <div className={styles.nudgeContainer}>
        <div className={styles.textElement}>
          <img src="smiley.png" alt="pour your heart out" />
          <p>Go into as much detail as possible</p>
        </div>
        <div className={styles.textElement}>
          <img src="/speaker.png" alt="turn up volume" />
          <p>Turn up volume for the best experience</p>
        </div>
      </div>
    </div>
  );
}
export default IntroScreen;
