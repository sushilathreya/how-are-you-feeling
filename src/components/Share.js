import React from "react";
import { RWebShare } from "react-web-share";
import styles from "./Share.module.css"

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
        
        onClick={() => console.log("shared successfully!")}
      >
        <button className={styles.shareBtn}>Share with friends</button>
      </RWebShare>
    </>
  );
};

export default Share;