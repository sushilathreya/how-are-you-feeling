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
      ></input>
    </div>
  );
}
export default IntroScreen;
