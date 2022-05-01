import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import styles from "./Carousel.module.css";
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';

const Carousel = ({ children }) => {

  return (
    <div className={styles["carousel"]}>
      <div className={styles["left"]}>
        <ArrowBackIcon />
      </div>
      <div className={styles["center"]}>
        <div className={styles["inner"]}>
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child);
          })}
        </div>
      </div>
      <div className={styles["right"]}>
        <ArrowForwardIcon />
      </div>
    </div>
  );
};

export default Carousel;
