import React from 'react'
import styles from './RegistrationPage1.module.css'
import { ReactComponent as SKIicon } from "../assets/SKI.svg";
import { ReactComponent as SKCTicon } from "../assets/SKCT.svg";
import Compguy from "../assets/compguy.png"
const registrationPage1 = () => {
  return (
    <div>

      <div className={`${styles.Navbar} ${styles.flex_row}`}>
        <div className={`${styles.flex_row} ${styles.title} ${styles.h_center}`}>
          <SKIicon className={`${styles.skctlogo1} ${styles.v_center}`} />
          <div className={`${styles.titleText} ${styles.flex_col}`}>
            <p>SRI KRISHNA COLLEGE OF TECHNOLOGY</p>
            <p>AUTONOMOUS INSTITUTION | ACCREDITED BY NAAC WITH ‘A’ GRADE</p>
          </div>
          <SKCTicon className={`${styles.skctlogo2} ${styles.v_center}`} />
        </div>
      </div>

      <div className={`${styles.flex_row} ${styles.body}`}>
        <div className={`${styles.leftContainer}`}>
          <img src={Compguy} alt="" />
        </div>
        <div className={`${styles.rightContainer}`}>
          <div className={`${styles.RegistrationContainer} ${styles.flex_col}`}>
            <p className={`${styles.RegistrationTitle}`}>Login Information</p>
            <div className={`${styles.flex_col} ${styles.BodyContainer}`}>
              <div className={`${styles.flex_row} ${styles.DoubleAttribute}`}>
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Username" />
              </div>
              <input type="text" placeholder="Username" />
              <input type="text" placeholder="Username" />
              <div className={`${styles.flex_row} ${styles.DoubleAttribute}`}>
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Username" />
              </div>
              <input type="text" placeholder="Username" />
              <input type="text" placeholder="Username" />

            </div>
            <div className={`${styles.flex_row} ${styles.ButtonContainer}`}>
              <button>Back to Login</button>
              <button>Next Page</button>

            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default registrationPage1