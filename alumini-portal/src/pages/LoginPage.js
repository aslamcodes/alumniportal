import React from 'react'
import styles from './LoginPage.module.css'
import KandiHuman from "../assets/kandiHuman.png";
import Navbar from '../components/Navbar'
import InputField from '../components/UI/InputField';
const LoginForm = () => {
  return (
    <div className={`${styles.loginContainer} ${styles.flex_col}`}>
      <p className={`${styles.loginTitle}`}>Login Now</p>
      <div className={`${styles.flex_col} ${styles.loginBodyContainer}`}>
        <p>Username</p>
        <InputField type="text" placeholder="Username" />
        <InputField type="password" placeholder="Password" />
        <p>By login you agree to our <a>Terms & conditions</a></p>
      </div>
      <div className={`${styles.flex_row} ${styles.loginButtonContainer}`}>
        <button>Login Now</button>
        <p><a >Forgot Password</a></p>
      </div>
      <hr />
      <p>Dont have an account yet ?  <a>Create Account</a></p>
    </div >
  )
}
const LoginPage = () => {
  return (
    <div className={`${styles.LoginPage} ${styles.flex_col}`}>
      <Navbar />
      <div className={`${styles.flex_row} ${styles.body}`}>
        <div className={`${styles.leftContainer}`}>
          <div className={`${styles.welcomeContainer}`}>
            <p>Welcome Back Aluminis We are excited!</p>
          </div>
          <img src={KandiHuman} alt="" className={styles.kandiHuman} />
        </div>
        <div className={`${styles.rightContainer}`}>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage;