import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationPage.module.css";
import { useForm } from "react-hook-form";
import { CustomSelect } from "../components/UI/CustomSelect";
import Navbar from "../components/Navbar";

import Compguy from "../assets/compguy.png";

const currentYear = new Date().getFullYear();
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const YearOfPassing = range(1985, currentYear, 1);
const Department = ["IT", "CSE", "ECE", "EEE", "MECH", "CIVIL", "MBA"];
const GraduationLevel = ["Under graduate", "Post graduate"];

const Page1 = ({ page, setPage }) => {
  const [yearPassing, setYearPassing] = useState("Year of passing");
  const [dept, setDept] = useState("Department");
  const [graduationLevel, setGraduationLevel] = useState("Graduation Level");

  let navigate = useNavigate();
  const onLoginButtonClick = () => navigate("/login");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    setPage(2);
    console.log(data);
  };
  return (
    <div className={styles["pageContainer"]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={`${styles.RegistrationTitle}`}>Login Information</p>
        <div className={`${styles.FormContainer}`}>
          <div className={`${styles.flex_row} ${styles.DoubleAttribute}`}>
            <CustomSelect
              selected={yearPassing}
              setSelected={setYearPassing}
              Items={YearOfPassing}
            />
            <CustomSelect
              selected={dept}
              setSelected={setDept}
              Items={Department}
            />
          </div>
          <CustomSelect
            selected={graduationLevel}
            setSelected={setGraduationLevel}
            Items={GraduationLevel}
          />

          <input
            className={styles["input-field"]}
            type="text"
            placeholder="Enter Your Name"
          />
          <input
            className={styles["input-field"]}
            type="text"
            placeholder="Enter Your Registration number"
          />
          <div className={`${styles.flex_row} ${styles.DoubleAttribute}`}>
            <input
              className={styles["input-field"]}
              type="date"
              placeholder="Select Your DOB"
            />
            <input
              className={styles["input-field"]}
              type="text"
              placeholder="Enter your Email Id"
            />
          </div>
          <input
            className={styles["input-field"]}
            type="text"
            placeholder="Enter password"
          />
          <input
            className={styles["input-field"]}
            type="text"
            placeholder="Confirm Password"
          />
        </div>
        <div className={`${styles.flex_row} ${styles.ButtonContainer}`}>
          <button onClick={onLoginButtonClick}>Back to Login</button>
          <button type="submit">Next Page</button>
        </div>
      </form>
    </div>
  );
};
const Page2 = ({ setPage }) => {
  const [isEnterpreneur, setIsEnterpreneur] = useState(false);
  const [isHigherStudies, setIsHigherStudies] = useState(false);

  let navigate = useNavigate();

  const onBackButtonClick = () => setPage(1);
  const onLoginButtonClick = () => navigate("/login");

  return (
    <div className={styles["pageContainer"]}>
      <p className={`${styles.RegistrationTitle}`}>Personal Information</p>
      <div className={`${styles.FormContainer}`}>
        <div className={`${styles.flex_row} ${styles.FormChoice}`}>
          <p>Are you an enterpreneur</p>
          <button
            onClick={() => setIsEnterpreneur(true)}
            className={`${isEnterpreneur && styles.ButtonPressed}`}
          >
            yes
          </button>
          <button
            onClick={() => setIsEnterpreneur(false)}
            className={`${!isEnterpreneur && styles.ButtonNotPressed}`}
          >
            no
          </button>
        </div>

        <div className={`${styles.flex_row} ${styles.FormChoice} `}>
          <p>Are you doing higher studies</p>
          <button
            onClick={() => setIsHigherStudies(true)}
            className={`${isHigherStudies && styles.ButtonPressed}`}
          >
            yes
          </button>
          <button
            onClick={() => setIsHigherStudies(false)}
            className={`${!isHigherStudies && styles.ButtonNotPressed}`}
          >
            no
          </button>
        </div>
        {isEnterpreneur && (
          <div className={`${styles.flex_row} ${styles.DoubleAttribute}`}>
            <input
              className={styles["input-field"]}
              type="text"
              placeholder="Company Name"
            />
            <input
              className={styles["input-field"]}
              type="text"
              placeholder="Company Email ID"
            />
          </div>
        )}

        {isHigherStudies && (
          <div className={`${styles.flex_row} ${styles.DoubleAttribute}`}>
            <input
              className={styles["input-field"]}
              type="text"
              placeholder="College Name"
            />
            <input
              className={styles["input-field"]}
              type="text"
              placeholder="Course Name"
            />
          </div>
        )}

        <input
          className={styles["input-field"]}
          type="text"
          placeholder="Your Designation (Working Professional)"
        />
        <input
          className={styles["input-field"]}
          type="text"
          placeholder="Enter your Organization name"
        />
        <div className={`${styles.flex_row} ${styles.DoubleAttribute}`}>
          <input
            className={styles["input-field"]}
            type="text"
            placeholder="Select Your City"
          />
          <input
            className={styles["input-field"]}
            type="text"
            placeholder="Select your state"
          />
        </div>
        <input
          className={styles["input-field"]}
          type="text"
          placeholder="Select your country"
        />
        <input
          className={styles["input-field"]}
          type="text"
          placeholder="Enter your Contact Number"
        />
        <input
          className={styles["input-field"]}
          type="text"
          placeholder="Skill/Domain"
        />
      </div>
      <div className={`${styles.flex_row} ${styles.ButtonContainer}`}>
        <button onClick={onBackButtonClick}>Back</button>
        <button
          type="submit"
          onClick={onLoginButtonClick}
          className={styles["SubmitButton"]}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const RegistrationPage = () => {
  const [page, setPage] = useState(1);

  return (
    <div className={styles["RegistrationPage"]}>
      <div className={`${styles.flex_row} ${styles.body}`}>
        <div className={`${styles.leftContainer}`}>
          <img src={Compguy} alt="" />
        </div>
        <div className={`${styles.rightContainer}`}>
          <div className={`${styles.RegistrationContainer} ${styles.flex_col}`}>
            {page === 1 && <Page1 page={page} setPage={setPage} />}
            {page === 2 && <Page2 setPage={setPage} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
