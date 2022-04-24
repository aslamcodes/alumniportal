import React from 'react'
import styles from './RegistrationPage1.module.css'
import Navbar from '../components/Navbar'
import InputField from '../components/UI/InputField'
import Compguy from "../assets/compguy.png"


const RegistrationPage1 = () => {
  return (
    <div>
      <Navbar />
      <div className={`${styles.flex_row} ${styles.body}`}>
        <div className={`${styles.leftContainer}`}>
          <img src={Compguy} alt="" />
        </div>
        <div className={`${styles.rightContainer}`}>
          <div className={`${styles.RegistrationContainer} ${styles.flex_col}`}>
            <p className={`${styles.RegistrationTitle}`}>Login Information</p>
            <div className={`${styles.flex_col} ${styles.BodyContainer}`}>
              <div className={`${styles.flex_row} ${styles.DoubleAttribute}`}>
                <InputField type="text" placeholder="Username" />
                <InputField type="text" placeholder="Username" />
              </div>
              <InputField type="text" placeholder="Username" />
              <InputField type="text" placeholder="Username" />
              <div className={`${styles.flex_row} ${styles.DoubleAttribute}`}>
                <InputField type="text" placeholder="Username" />
                <InputField type="text" placeholder="Username" />
              </div>
              <InputField type="text" placeholder="Username" />
              <InputField type="text" placeholder="Username" />

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

export default RegistrationPage1