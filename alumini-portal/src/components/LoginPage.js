import React from 'react'
import styles from './LoginPage.module.css'
import { ReactComponent as SKIicon } from "../assets/SKI.svg";
import { ReactComponent as SKCTicon } from "../assets/SKCT.svg";
import KandiHuman from "../assets/kandiHuman.png";
const LoginPage = () => {
  return (
    <div className={`${styles.LoginPage} ${styles.flex_col}`}>
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

      <div className={`${styles.flex_row} ${styles.body}`}>
        <div className={`${styles.leftContainer}`}>
          <div className={`${styles.welcomeContainer}`}>
            <p>Welcome Back Aluminis We are excited!</p>
          </div>
          <img src={KandiHuman} alt="" className={styles.kandiHuman} />
        </div>
        <div className={`${styles.rightContainer}`}>
          <div className={`${styles.loginContainer} ${styles.flex_col}`}>
            <p className={`${styles.loginTitle}`}>Login Now</p>
            <div className={`${styles.flex_col} ${styles.loginBodyContainer}`}>
              <p>Username</p>
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <p>By login you agree to our <a>Terms & conditions</a></p>
            </div>
            <div className={`${styles.flex_row} ${styles.loginButtonContainer}`}>
              <button>Login Now</button>
              <p><a >Forgot Password</a></p>
            </div>
            <hr />
            <p>Dont have an account yet ?  <a>Create Account</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;