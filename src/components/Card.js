import styles from "./Card.module.css"
import React from "react";

function Card(props) {
  return <section className={styles.card}>{props.children}</section>;
}

export default Card;
