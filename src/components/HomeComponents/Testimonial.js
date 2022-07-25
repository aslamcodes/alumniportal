import React from 'react'
import styles from './Testimonial.module.css'
function Testimonial({ type, quotes, name, id, children }) {
  return (
    <div className={`${styles["Testimonial"]} `}>
      <div className={styles["Testimonial-content"]}>
        <div className={styles['Profile-Container']}>
          {children}
        </div>
        <div className={styles['Quotes']}>
          <h2>{quotes}</h2>
          <p>- {name}</p>
        </div>
      </div>
    </div>
  )
}

export default Testimonial