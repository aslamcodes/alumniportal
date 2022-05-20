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
              <h1>Welcome <span>Back</span></h1>
              <p><span>“</span>I think the success of any school can be measured by the contribution the alumni make to our national life<span>”</span></p>
            </div>
          </div>
        }
        {!goingUp &&
          <div id={styles["Testimonials"]}>
            <div className={`${styles.Container}`}>
              <Carousel >
                <Testimonial index={0}
                  quotes="“Hi, This is Jesso Clarence i am working at Jakash corporation”"
                  name="Mr.Jesso Clarence.M Engineering Manager, Akamai Technology, Bangalore Batch: 2006-2010"
                >
                  <img src={require('../assets/carousel1.png')} alt="" />
                </Testimonial>

                <Testimonial index={1}
                  quotes="“Hi, This is Christopher i am working at Jakash corporation”"
                  name="Mr.Jesso Clarence.M Engineering Manager, Akamai Technology, Bangalore Batch: 2006-2010"
                >
                  <img src={require('../assets/carousel2.png')} alt="" />
                </Testimonial>

                <Testimonial index={2}
                  quotes="“Hi, This is Christopher i am working at Jakash corporation”"
                  name="Mr.Jesso Clarence.M Engineering Manager, Akamai Technology, Bangalore Batch: 2006-2010"
                >
                  <img src={require('../assets/carousel3.jpg')} alt="" />
                </Testimonial>

                <Testimonial index={3}
                  quotes="“Hi, This is Christopher i am working at Jakash corporation”"
                  name="Mr.Jesso Clarence.M Engineering Manager, Akamai Technology, Bangalore Batch: 2006-2010"
                >
                  <img src={require('../assets/carousel4.jpg')} alt="" />
                </Testimonial>


              </ Carousel >


            </div>
          </div>
        }

      </div>

    </div>
  )
}

export default Home