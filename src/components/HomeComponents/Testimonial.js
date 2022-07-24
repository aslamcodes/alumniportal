import React from 'react'
import styles from './Testimonial.module.css'
function Testimonial({ type, quotes, name, id, children }) {
  return (
    <div className={`${styles["Testimonial"]} ${type === "left" && styles.left || type === "center" && styles.center || type === "right" && styles.right}`}
      style={{ transform: `translateX(-${0}%)` }}>
      <div className={styles["Testimonial-content"]}>
        <div className={styles['Profile-Container']}>
          <div className={styles['img']}>
            {children}
          </div>

        </div>
        <div>
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