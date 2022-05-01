import React from 'react'
import styles from './Testimonial.module.css'
function Testimonial() {
  return (
    <div className={styles['Testimonial']}>
      <div className={styles['Profile-Container']}>
        <img src={require("../assets/christopher.jpg")} alt="" />
      </div>
      <div className={styles['Quotes']}>
        <p>“Hi, This is Christopher i am working at Jakash corporation”</p>
      </div>

    </div>
  )
}

export default Testimonial