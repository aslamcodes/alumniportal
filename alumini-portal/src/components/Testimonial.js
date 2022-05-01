import React from 'react'
import styles from './Testimonial.module.css'
function Testimonial({ index }) {
  return (
    <div className={styles["Testimonial"]}>
      <div className={styles["Testimonial-content"]}>
        <div className={styles['Profile-Container']}>
          <img src={require("../assets/christopher.jpg")} alt="" />
        </div>
        <div className={styles['Quotes']}>
          <p>“Hi, This is Christopher i am working at Jakash corporation”{index}</p>
        </div>
      </div>
    </div>
  )
}

export default Testimonial