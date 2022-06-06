import React from "react";
import styles from "./ForgotPassword.module.css";
import hypocrisy from "../assets/forgotPassword.png";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img src={hypocrisy} alt="register image" />
      </div>
      <div className={styles.form_container}>
        <div className={styles.form}>
          <div className={styles.form_header}>
            <h1>Forgot Password</h1>
          </div>
          <div className={styles.form_body}>
            <form >
              <div className={styles.form_input_container}>
                <input type="text" placeholder="Enter your email ID" />
              </div>
              <p>Or</p>
              <div className={styles.form_input_container}>
                <input type="text" placeholder="Enter your Phone number" />
              </div>
              <div className={styles.form_actions_container}>
                <Link to='/login'>Back to Login</Link>
                <button >Next</button>
              </div>
            </form>

          </div>
          <hr />
          <div className={styles.form_footer}>
            <p>
              Don't have an account yet?{" "}
              <Link to="/register">
                <span>Create Account</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ForgotPassword;
