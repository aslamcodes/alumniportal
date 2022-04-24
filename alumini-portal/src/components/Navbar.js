import React from 'react'
import { ReactComponent as SKIicon } from "../assets/SKI.svg";
import { ReactComponent as SKCTicon } from "../assets/SKCT.svg";
import styles from "./Navbar.module.css";
const Navbar = () => {
  return (
    <div className={`${styles.Navbar} ${styles.flex_row}`}>
      <div >
        <p><a >Home</a></p>
      </div>
      <div className={`${styles.flex_row} ${styles.title} ${styles.h_center}`}>
        <SKIicon className={`${styles.skctlogo1} ${styles.v_center}`} />
        <div className={`${styles.titleText} ${styles.flex_col}`}>
          <p>SRI KRISHNA COLLEGE OF TECHNOLOGY</p>
          <p>AUTONOMOUS INSTITUTION | ACCREDITED BY NAAC WITH ‘A’ GRADE</p>
        </div>
        <SKCTicon className={`${styles.skctlogo2} ${styles.v_center}`} />
      </div>
      <div className={`${styles.flex_row} ${styles.right}`}>
        <p><a >Gallery</a></p>
        <p><a >Events</a></p>
      </div>
    </div>
  )
}

export default Navbar;