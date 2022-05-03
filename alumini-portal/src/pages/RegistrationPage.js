import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationPage.module.css'

import { CustomSelect } from '../components/UI/CustomSelect'
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
    <div className={styles["pageContainer"]}>
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
          <InputField type="date" placeholder="Select Your DOB" />
          <InputField type="text" placeholder="Enter your Email Id" />
        </div>
        <InputField type="text" placeholder="Enter password" />
        <InputField type="text" placeholder="Confirm Password" />

      </div>
    </div>
  )
}
const Page2 = () => {
  const [isEnterpreneur, setIsEnterpreneur] = useState(false);
  const [isHigherStudies, setIsHigherStudies] = useState(false);
  return (
    <div className={styles["pageContainer"]}>
      <p className={`${styles.RegistrationTitle}`}>Personal Information</p>
      <div className={`${styles.FormContainer}`}>
        <div className={`${styles.flex_row} ${styles.FormChoice}`}>

          <p>Are you an enterpreneur</p>
          <button onClick={() => setIsEnterpreneur(true)} className={`${isEnterpreneur && styles.ButtonPressed}`}>yes</button>
          <button onClick={() => setIsEnterpreneur(false)} className={`${!isEnterpreneur && styles.ButtonNotPressed}`}>no</button>

        </div>

        <div className={`${styles.flex_row} ${styles.FormChoice} `}>
          <p>Are you doing higher studies</p>
          <button onClick={() => setIsHigherStudies(true)} className={`${isHigherStudies && styles.ButtonPressed}`}>yes</button>
          <button onClick={() => setIsHigherStudies(false)} className={`${!isHigherStudies && styles.ButtonNotPressed}`}>no</button>
        </div>
        {isEnterpreneur && <div className={`${styles.flex_row} ${styles.DoubleAttribute}`}>
          <InputField type="text" placeholder="Company Name" />
          <InputField type="text" placeholder="Company Email ID" />
        </div>}

        {isHigherStudies && <div className={`${styles.flex_row} ${styles.DoubleAttribute}`}>
          <InputField type="text" placeholder="College Name" />
          <InputField type="text" placeholder="Course Name" />
        </div>}

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