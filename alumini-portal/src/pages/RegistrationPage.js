import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CustomSelect } from '../components/UI/CustomSelect'
import styles from './RegistrationPage.module.css'
import Navbar from '../components/Navbar'
import InputField from '../components/UI/InputField'
import Compguy from "../assets/compguy.png"

const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));


const YearOfPassing = range(1985, currentYear, 1);
const Department = ['IT', 'CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'MBA'];
const GraduationLevel = ['Under graduate', 'Post graduate'];

const Page1 = () => {
  const [yearPassing, setYearPassing] = useState("Year of passing");
  const [dept, setDept] = useState("Department");
  const [graduationLevel, setGraduationLevel] = useState("Graduation Level");
  return (
    <div>
      <p className={`${styles.RegistrationTitle}`}>Login Information</p>
      <div className={`${styles.FormContainer}`}>
        <div className={`${styles.flex_row} ${styles.DoubleAttribute}`}>
          <CustomSelect selected={yearPassing} setSelected={setYearPassing} Items={YearOfPassing} />
          <CustomSelect selected={dept} setSelected={setDept} Items={Department} />




        </div>
        <CustomSelect selected={graduationLevel} setSelected={setGraduationLevel} Items={GraduationLevel} />


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
    <div className={styles["RegistrationPage"]}>
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
              {page === 2 && <button onClick={onLoginButtonClick} className={styles["SubmitButton"]}>Submit</button>}
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default RegistrationPage