import React, { useState } from "react";
import styles from "./Carousel.module.css";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollPause, setScrollPause] = useState(true);
  let scrollInterval = null;
  const leftButtonHandler = () => {
    if (activeIndex === 0) {
      setActiveIndex(children.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
    console.log(activeIndex);
  };

  const rightButtonHandler = () => {
    if (activeIndex === children.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
    console.log(activeIndex);
  };

  const scrollMouseEnterHandler = () => {
    setScrollPause(false);
  };
  const scrollMouseLeaveHandler = () => {
    setScrollPause(true);
  };

  React.useEffect(() => {
    if (scrollPause) {
      scrollInterval = setTimeout(() => {
        setActiveIndex((activeIndex + 1) % children.length);
        console.log("activeIndex", activeIndex);
        console.log("children.length", children.length);
      }, 3000);
      return () => clearTimeout(scrollInterval);
    }
  });

  return (
    <div className={styles["carousel"]}>
      <div className={styles["left"]} onClick={leftButtonHandler}>
        <ArrowBack />
      </div>
      <div className={styles["center"]}>
        <div
          className={styles["inner"]}
          onMouseEnter={scrollMouseEnterHandler}
          onMouseLeave={scrollMouseLeaveHandler}
        >
          {React.Children.map(children, (child, index) => {
            return activeIndex === index && child;
          })}
        </div>
      </div>
      <div className={styles["right"]} onClick={rightButtonHandler}>
        <ArrowForward />
      </div>
    </div>
  );
};

export default Carousel;
