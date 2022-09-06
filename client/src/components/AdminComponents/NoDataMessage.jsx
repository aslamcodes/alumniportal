import React from "react";
import { GiMagnifyingGlass } from "react-icons/gi";
import styles from "./NoDataMessage.module.css";
function NoDataMessage() {
  return (
    <div className={styles.NoDataMessageContainer}>
      <GiMagnifyingGlass fontSize={60} />
      No Results found!
    </div>
  );
}

export default NoDataMessage;
