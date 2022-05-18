import React from 'react'
import styles from './Testimonial.module.css'
function Testimonial({ quotes, children }) {
  return (
    <div className={styles["Testimonial"]}>
      <div className={styles["Testimonial-content"]}>
        <div className={styles['Profile-Container']}>
          {children}
        </div>
        <div>
          <div className={styles['Quotes']}>
            <p>{quotes}</p>

          </div>
          <div className={styles['Name']}>
            <p>- Christopher</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial