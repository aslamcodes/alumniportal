import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationPage.module.css'
import Navbar from '../components/Navbar'
import InputField from '../components/UI/InputField'
import Compguy from "../assets/compguy.png"

const Page1 = () => {
  return (
    <div>
      <p className={`${styles.RegistrationTitle}`}>Login Information</p>
      <div className={`${styles.FormContainer}`}>
        <div className={`${styles.flex_row} ${styles.DoubleAttribute}`}>
          <InputField type="text" placeholder="Select Year of Passing" />
          <InputField type="text" placeholder="Select your department" />
        </div>
        <InputField type="text" placeholder="Enter Your Name" />
        <InputField type="text" placeholder="Enter Your Registration number" />
        <div className={`${styles.flex_row} ${styles.DoubleAttribute}`}>
          <InputField type="text" placeholder="Select Your DOB" />
          <InputField type="text" placeholder="Enter your Email Id" />
        </div>
        <InputField type="text" placeholder="Enter password" />
        <InputField type="text" placeholder="Confirm Password" />

      </div>
    </div>
  )
}
const Page2 = () => {
  return (
    <div>
      <p className={`${styles.RegistrationTitle}`}>Personal Information</p>
      <div className={`${styles.FormContainer}`}>
        <div className={`${styles.flex_col}`}>
          <p>Are you an enterpreneur</p>
        </div>
        <div className={`${styles.flex_col}`}>
          <p>Are you doing higher studies</p>
        </div>
        <InputField type="text" placeholder="Your Designation (Working Professional)" />
        <InputField type="text" placeholder="Enter your Organization name" />
        <div className={`${styles.flex_row} ${styles.DoubleAttribute}`}>
          <InputField type="text" placeholder="Select Your City" />
          <InputField type="text" placeholder="Select your state" />
        </div>
        <InputField type="text" placeholder="Select your country" />
        <InputField type="text" placeholder="Enter your Contact Number" />
        <InputField type="text" placeholder="Skill/Domain" />

      </div>
    </div>
  )
}

const RegistrationPage = () => {

  let navigate = useNavigate();
  const [page, setPage] = useState(1)

  const onNextButtonClick = () => {
    setPage(2)
  }
  const onLoginButtonClick = () => navigate('/login');
  const onBackButtonClick = () => setPage(1)


  return (
    <div>
      <Navbar />
      <div className={`${styles.flex_row} ${styles.body}`}>
        <div className={`${styles.leftContainer}`}>
          <img src={Compguy} alt="" />
        </div>
        <div className={`${styles.rightContainer}`}>
          <div className={`${styles.RegistrationContainer} ${styles.flex_col}`}>

            {page === 1 && <Page1 />}
            {page === 2 && <Page2 />}
            <div className={`${styles.flex_row} ${styles.ButtonContainer}`}>
              {page === 1 && <button onClick={onLoginButtonClick} >Back to Login</button>}
              {page === 1 && <button onClick={onNextButtonClick}>Next Page</button>}
              {page === 2 && <button onClick={onBackButtonClick}>Back</button>}
              {page === 2 && <button onClick={onLoginButtonClick}>Submit</button>}
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default RegistrationPage