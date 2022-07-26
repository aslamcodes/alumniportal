import React from 'react'
import styles from './Testimonial.module.css'
function Testimonial({ type, quotes, name, imgSrc }) {
  return (
    <div className={`${styles["Testimonial"]} `}>
      <div className={styles["Testimonial-content"]}>
        <div className={styles['Profile-Container']}>
          <img src={imgSrc} alt="" />
        </div>
        <div className={styles['Quotes-Container']}>
          <div className={styles['Quotes']}>
            <p>{quotes}</p>

          </div>
          <div className={styles['Author']}>
            <p>- {name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial