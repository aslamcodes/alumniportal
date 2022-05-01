import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Testimonial from '../components/Testimonial'
import Carousel, { CarouselItem } from '../components/UI/Carousel';
import styles from './Home.module.css'




const Home = () => {



  return (
    <div className={`${styles.Body} `} >
      <Navbar />
      <div id={styles["Welcome"]}>
        <div className={`${styles.Container}`}>
          <p>Welcome <span>Back</span></p>
          <p><span>“</span>I think the success of any school can be measured by the contribution the alumni make to our national life<span>”</span></p>
        </div>
      </div>
      <div id={styles["Testimonials"]}>
        <div className={`${styles.Container}`}>
          <Carousel >
            <Testimonial />
          </ Carousel >


        </div>

      </div>

    </div>
  )
}

export default Home