import React, { useState, useEffect } from "react";
import styles from "./Carousel.module.css";
import { useSwipeable } from "react-swipeable";
import Testimonial from "components/HomeComponents/Testimonial";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Carousel = ({ testimonials, onDelete }) => {
  const [scrollPause, setScrollPause] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  let scrollInterval = null;
  const leftButtonHandler = () => {
    if (activeIndex === 0) {
      setActiveIndex((testimonials.length - 1));
    } else {
      setActiveIndex((activeIndex - 1));
    }
  };

  const rightButtonHandler = () => {
    if (activeIndex === (testimonials.length - 1)) {
      setActiveIndex(0);
    } else {
      setActiveIndex((activeIndex + 1));
    }
  };

  const mouseEnterHandler = () => {
    setScrollPause(true);
  };
  const mouseLeaveHandler = () => {
    setScrollPause(false);
  };

  useEffect(() => {
    if (!scrollPause) {
      scrollInterval = setTimeout(() => {
        setActiveIndex((activeIndex + 1) % testimonials.length);
      }, 3500);
      return () => clearTimeout(scrollInterval);
    }
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      rightButtonHandler();
    },
    onSwipedRight: () => {
      leftButtonHandler();
    }
  });

  return (
    <div
      {...handlers}
      className={styles["carousel"]}>
      <div className={styles.navigate_left} onClick={leftButtonHandler}>
        <BsChevronLeft />
      </div>
      <div className={styles.navigate_right} onClick={rightButtonHandler}>
        <BsChevronRight />
      </div>
      <div
        className={styles["inner"]}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {testimonials.map((testimonial, index) => {
          return (
            <div
              className={styles.carousel_item}
              style={{ width: "100%" }}
              onMouseEnter={mouseEnterHandler}
              onMouseLeave={mouseLeaveHandler}
            >
              <Testimonial
                key={index}
                id={index}
                quotes={testimonial.quote}
                name={testimonial.name}
                testimonialId={testimonial._id}
                onDelete={onDelete}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
