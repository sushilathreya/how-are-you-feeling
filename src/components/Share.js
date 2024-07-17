import React from "react";
import { RWebShare } from "react-web-share";
import ReactGA from "react-ga";
import styles from "./Share.module.css"

ReactGA.initialize("G-LVL27T0XYL");

const Share = (props) => {
  return (
    <>
      <RWebShare
        data={{
          text: "How to feel better in 10s",
          url: "https://sushilathreya.github.io/how-are-you-feeling/",
          title: "Make your friends feel better",
          sites: ["twitter", "whatsapp", "reddit", "telegram", "copy"]
        }}
        
        onClick={() => {
          console.log("shared successfully!");
        }}
      >
        <button className={styles.shareBtn} onClick={() => {
          console.log("shared successfully!");
          ReactGA.event({
            category: "User",
            action: "Share button clicked"
          })
        }}>{props.shareText}</button>
      </RWebShare>
    </>
  );
};

export default Share;