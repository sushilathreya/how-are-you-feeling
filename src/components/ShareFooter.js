import React from "react";
import Share from "./Share";
import styles from "./ShareFooter.module.css"


function ShareFooter(props) {
  return (
    <div className={styles.footer}>
        <Share />
        <a href="https://www.buymeacoffee.com/Fz7yfN1s35" className={styles.coffee}>Buy me a coffee ☕</a>
        {props.showTry && <button className={styles.tryAgainBtn} onClick={props.hideRock}>Try Again</button>}
    </div>
  );
}

export default ShareFooter;