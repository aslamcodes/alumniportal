import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./RegistrationPageStudent.module.css";
import Compguy from "assets/compguy.png";
import { register } from "context/auth/actions";
import {
  useAuthContext,
  useAuthDispatchContext,
} from "context/auth/authContext";
import Loader from "components/UI/Loader";

const currentYear = new Date().getFullYear();
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const YearOfPassing = range(1985, currentYear + 4, 1);
const Department = ["IT", "CSE", "ECE", "EEE", "MECH", "CIVIL", "MBA"];
const graduationLevelOptions = ["Under graduate", "Post graduate"];

function RegistrationPageStudent() {
  const navigate = useNavigate();
  const dispatch = useAuthDispatchContext();
  const { user, isLoading, error } = useAuthContext();
  const location = useLocation();
  const [formStep, setFormStep] = useState(1);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    registerNumber: "",
    department: "",
    phoneNumber: "",
    yearOfPassing: "",
    country: "",
    state: "",
    city: "",
    graduationLevel: "",
    dateOfBirth: "",
    skill: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    await register(dispatch, formData);
  };

  if (error) {
    alert(error);
  }

  if (user) {
    navigate(location?.from ?? "/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img src={Compguy} alt="register image" />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.form_container}>
          <div className={styles.form}>
            <div className={styles.form_header}>
              <h1>
                {formStep === 1
                  ? "Register as Student"
                  : "Personal Information"}
              </h1>
            </div>

            <div className={styles.form_body}>
              <form onSubmit={handleSubmit}>
                {formStep === 1 ? (
                  <section>
                    <div
                      className={`${styles.form_input_container} ${styles.split_container}`}
                    >
                      <select
                        name="yearOfPassing"
                        type="text"
                        id="yop"
                        value={data.yearOfPassing}
                        onChange={handleChange}
                      >
                        <option
                          value="Year of passing"
                          className={styles.select_items}
                        >
                          {" "}
                          Year of passing
                        </option>
                        {YearOfPassing.map((year) => (
                          <option
                            key={year}
                            value={year}
                            className={styles.select_items}
                          >
                            {year}
                          </option>
                        ))}
                      </select>
                      <select
                        name="department"
                        type="text"
                        id="dept"
                        value={data.department}
                        onChange={handleChange}
                      >
                        <option value="department"> Department</option>
                        {Department.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.form_input_container}>
                      <select
                        name="graduationLevel"
                        type="text"
                        id="gradlevel"
                        value={data.graduationLevel}
                        onChange={handleChange}
                      >
                        <option value="">Graduation level</option>
                        {graduationLevelOptions.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.form_input_container}>
                      <input
                        name="name"
                        type="text"
                        id="name"
                        placeholder="Name"
                        value={data.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.form_input_container}>
                      <input
                        name="registerNumber"
                        type="text"
                        id="register_no"
                        placeholder="Register Number"
                        value={data.registerNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      className={`${styles.form_input_container} ${styles.split_container}`}
                    >
                      <input
                        name="dateOfBirth"
                        type="date"
                        id="dateOfBirth"
                        value={data.dateOfBirth}
                        onChange={handleChange}
                      />
                      <input
                        name="email"
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.form_input_container}>
                      <input
                        name="password"
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.form_input_container}>
                      <input
                        name="confirmPassword"
                        type="password"
                        id="confirm_password"
                        placeholder="Confirm Password"
                        value={data.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      className={`${styles.form_button_container} ${styles.split_container}`}
                    >
                      <button onClick={() => navigate("/login")}>
                        back to login
                      </button>
                      <button onClick={() => setFormStep(2)}> next page</button>
                    </div>
                  </section>
                ) : (
                  <section>
                    <div className={`${styles.form_input_container} `}>
                      <input
                        name="city"
                        type="text"
                        id="city"
                        placeholder="Select your city"
                        value={data.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={`${styles.form_input_container} `}>
                      <input
                        name="state"
                        type="text"
                        id="state"
                        placeholder="Select your state"
                        value={data.state}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.form_input_container}>
                      <input
                        name="country"
                        type="text"
                        id="country"
                        placeholder="Select your country"
                        value={data.country}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.form_input_container}>
                      <input
                        name="phoneNumber"
                        type="number"
                        id="phoneNumber"
                        placeholder="Enter your contact no"
                        value={data.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.form_input_container}>
                      <input
                        name="skill"
                        type="text"
                        id="skill"
                        placeholder="Skill/Domain"
                        value={data.skill}
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      className={`${styles.form_button_container} ${styles.split_container}`}
                    >
                      <button onClick={() => setFormStep(1)}>Back</button>
                      <button type="submit"> Submit</button>
                    </div>
                  </section>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrationPageStudent;
