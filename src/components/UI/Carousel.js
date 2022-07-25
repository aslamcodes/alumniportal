import React, { useState, useEffect } from "react";
import styles from "./Carousel.module.css";
import Testimonial from "components/HomeComponents/Testimonial";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
const Carousel = ({ data }) => {
  const [itemStatus, setItemStatus] = useState({
    left: data.length - 1,
    center: 0,
    right: 1,
  });

  const [scrollPause, setScrollPause] = useState(true);
  let scrollInterval = null;
  const leftButtonHandler = () => {
    if (itemStatus.center === 0) {
      setItemStatus({
        left: data.length - 2,
        center: data.length - 1,
        right: 0,
      });
    } else {
      setItemStatus({
        left: itemStatus.center - 2,
        center: itemStatus.center - 1,
        right: itemStatus.center,
      });
    }

    console.log('leftButtonHandler', itemStatus);
  };

  const rightButtonHandler = () => {

    setItemStatus({
      left: itemStatus.center,
      center: itemStatus.center + 1,
      right: itemStatus.center + 2,
    });

    console.log('rightButtonHandler', itemStatus);
  };

  const scrollMouseEnterHandler = () => {
    setScrollPause(false);
  };
  const scrollMouseLeaveHandler = () => {
    setScrollPause(true);
  };

  // useEffect(() => {
  //   if (scrollPause) {
  //     scrollInterval = setTimeout(() => {
  //       setActiveIndex((activeIndex + 1) % children.length);
  //     }, 3000);
  //     return () => clearTimeout(scrollInterval);
  //   }
  // });

  return (
    <div className={styles["carousel"]}>
      <div className={styles["inner"]}
        style={{ transform: `translateX(-${0}%)` }}
      >

        {data.map((item, index) => {
          return (
            <div className={styles.carousel_item} style={{ width: '100%' }}>
              <Testimonial
                key={index}
                id={index}
                quotes={item.quotes}
                name={item.name}
              >{item.children}
              </Testimonial>
            </div>
          )
        }
        )}
      </div>
    </div >

  );
};

export default Carousel;
