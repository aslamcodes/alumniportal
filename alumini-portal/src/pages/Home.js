import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Testimonial from '../components/Testimonial'
import Carousel, { CarouselItem } from '../components/UI/Carousel';
import styles from './Home.module.css'




const Home = () => {
  const prevScrollY = useRef(0);
  const [goingUp, setGoingUp] = useState(true);

  const onScroll = (e) => {
    const currentScrollY = e.target.scrollTop;
    if (prevScrollY.current < currentScrollY && goingUp) {
      setGoingUp(false);
    }
    if (prevScrollY.current > currentScrollY && !goingUp) {
      setGoingUp(true);
    }
    prevScrollY.current = currentScrollY;
    console.log(goingUp, currentScrollY);
  };


  return (
    <div className={`${styles.Body} `} >
      <Navbar />
      <div onScroll={onScroll} className={styles["Content-Container"]}>
        {goingUp &&
          <div id={styles["Welcome"]}>
            <div className={`${styles.Container}`}>
              <p>Welcome <span>Back</span></p>
              <p><span>“</span>I think the success of any school can be measured by the contribution the alumni make to our national life<span>”</span></p>
            </div>
          </div>
        }
        {!goingUp &&
          <div id={styles["Testimonials"]}>
            <div className={`${styles.Container}`}>
              <Carousel >
                <Testimonial index={0} />
                <Testimonial index={1} />
                <Testimonial index={2} />
                <Testimonial index={3} />


              </ Carousel >


            </div>
          </div>
        }

      </div>

    </div>
  )
}

export default Home