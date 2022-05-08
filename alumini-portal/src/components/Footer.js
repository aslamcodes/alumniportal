import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles["footer"]}>
      <div className={styles["footer-container"]}>
        <div className={styles["top"]}>
          top
        </div>

        <div className={styles["Bottom"]}>
          bottom
        </div>
      </div>
    </div>
  )
}

export default Footer
