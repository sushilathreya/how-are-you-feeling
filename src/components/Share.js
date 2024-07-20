import React from "react";
import { RWebShare } from "react-web-share";
import { trackEvent } from "../utils/analytics.js";
import styles from "./Share.module.css"

const Share = (props) => {
  return (
    <>
      <RWebShare
        data={{
          text: "How to feel better in 10s",
          url: "https://sushilathreya.github.io/how-are-you-feeling/",
          title: "Make your friends feel better",
          sites: ["x", "whatsapp", "reddit", "telegram", "copy"]
        }}
        
        onClick={() => {
          console.log("shared successfully!");
        }}
      >
        <button className={styles.shareBtn} onClick={() => {
          console.log("shared successfully!");
          trackEvent('Share Clicked', 'user', 'button_label', 1);
        }}>{props.shareText}</button>
      </RWebShare>
    </>
  );
};

export default Share;