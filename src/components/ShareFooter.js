import React from "react";
import Share from "./Share";
import styles from "./ShareFooter.module.css"


function ShareFooter() {
  return (
    <div className={styles.footer}>
        <Share />
        <a href="https://www.buymeacoffee.com/Fz7yfN1s35" className={styles.coffee}>Buy me a coffee ☕</a>
    </div>
  );
}

export default ShareFooter;