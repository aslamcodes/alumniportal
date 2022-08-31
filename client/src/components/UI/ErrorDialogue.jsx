import React from "react";
import styles from "./ErrorDialogue.module.css";

const ErrorDialogue = ({ errorMessage }) => {
  return <div className={styles.error_container}>{errorMessage}</div>;
};

export default ErrorDialogue;
