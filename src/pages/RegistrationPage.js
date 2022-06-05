import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationPage.module.css";
import Compguy from "../assets/compguy.png";

function RegistrationPage() {
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img src={Compguy} alt="register image" />
      </div>
      <div className={styles.form_container}>
        <div className={styles.form_header}>
          <h1>Register</h1>
        </div>
        <div className={styles.form_body}>
          <form>
            <div className={`${styles.form_input_container} ${styles.split_container}`}>
              <select type="text" id="yop" >
                <option value="Year of passing"> year of passing</option>
              </select>
              <select type="text" id="dept" >
                <option value="department"> Department</option>
              </select>
            </div>
            <div className={styles.form_input_container}>
              <select type="text" id="gradlevel">
                <option value="">Graduation level</option>
              </select>
            </div>
            <div className={styles.form_input_container}>
              <input type="text" id="name" placeholder="Name" />
            </div>
            <div className={styles.form_input_container}>
              <input type="text" id="reg_no" placeholder="Register Number" />
            </div>
            <div className={`${styles.form_input_container} ${styles.split_container}`}>
              <input type="date" id="dob" />
              <input type="email" id="email" placeholder="Email" />
            </div>
            <div className={styles.form_input_container}>
              <input type="password" id="password" placeholder="Password" />
            </div>
            <div className={styles.form_input_container}>
              <input type="password" id="confirm_password" placeholder="Confirm Password" />
            </div>
            <div className={`${styles.form_button_container} ${styles.split_container}`}>
              <button>back to login</button>
              <button> next page</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage