import React from "react";
import Share from "./Share";
import styles from "./ShareFooter.module.css"


function ShareFooter(props) {
  return (
    <div className={styles.footer}>
        {!props.showTry && <Share shareText="Share with your friends"/>}
        {props.showTry && <Share shareText="Rockroll your friends"/>}
        <a href="https://www.buymeacoffee.com/Fz7yfN1s35" className={styles.coffee}>Buy me a coffee ☕</a>
        {props.showTry && <button className={styles.tryAgainBtn} onClick={props.hideRock}>Try Again</button>}
    </div>
  );
}

export default ShareFooter;