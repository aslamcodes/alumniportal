import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./RegistrationPageStudent.module.css";
import Compguy from "assets/compguy.png";
import { register } from "context/auth/actions";
import {
  useAuthContext,
  useAuthDispatchContext,
} from "context/auth/authContext";
import Loader from "components/UI/Loader";
import { useFetchAlumniStoredData } from "hooks/useFetchAlumniStoredData";
import { useAlertContext } from "context/alert/alertContext";
import { Country, State, City } from "country-state-city";

const currentYear = new Date().getFullYear();
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const YearOfPassing = range(1985, currentYear + 4, 1);
const Department = ["B.TECH IT", "B.E CSE", "B.E ECE", "B.E EEE", "B.E MECH", "B.E CIVIL", "MBA"];
const graduationLevelOptions = ["Under graduate", "Post graduate"];

function RegistrationPageStudent() {

  useEffect(() => {
    document.title = "Alumni Portal | Register"
  }, []);

  const today = new Date().toJSON().slice(0, 10);
  const navigate = useNavigate();
  const dispatch = useAuthDispatchContext();
  const { user, isLoading, error } = useAuthContext();
  const location = useLocation();
  const [formStep, setFormStep] = useState(1);
  const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    registerNumber: "",
    department: "",
    phoneNumber: "",
    yearOfPassing: "",
    country: "IN",
    state: "TN",
    city: "",
    graduationLevel: "",
    dateOfBirth: "",
    skill: "",
  });

  const { success } = useAlertContext();

  const emailRef = useRef("");
  const registerNumberRef = useRef("");
  const departmentRef = useRef("");

  const temp = useFetchAlumniStoredData({
    email: emailRef.current,
    registerNumber: registerNumberRef.current,
    department: departmentRef.current,
  });

  const handleChange = (e) => {
    if (e.target.name === "confirmPassword") {
      setIsCPasswordDirty(true);
    }
    if (e.target.name === "phoneNumber") {
      return setData({
        ...data,
        [e.target.name]: e.target.value.slice(0, 10),
      });
    }
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputBlur = (e) => {
    emailRef.current = data.email;
    registerNumberRef.current = data.registerNumber;
    departmentRef.current = data.department;
  };

  const handleSubmitPage1 = async (e) => {
    e.preventDefault();
    setFormStep(2);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "country") {
        return formData.append(
          key,
          Country.getCountryByCode(data.country).name
        );
      }
      if (key === "state") {
        return formData.append(
          key,
          State.getStateByCodeAndCountry(data.state, data.country).name
        );
      }
      formData.append(key, data[key]);
    });

    await register(dispatch, formData);
  };

  useEffect(() => {
    if (isCPasswordDirty) {
      if (data.password === data.confirmPassword) {
        setIsPasswordMatch(true);
      } else {
        setIsPasswordMatch(false);
      }
    }
  }, [data.confirmPassword, isCPasswordDirty, data.password]);

  useEffect(() => {
    if (error) success(error);
  }, [error, success]);

  if (user) {
    navigate(location?.from ?? "/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img src={Compguy} alt="register" />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.form_container}>
          <div className={styles.form}>
            <div className={styles.form_header}>
              <h1>{formStep === 1 ? "Register" : "Personal Information"}</h1>
            </div>

            <div className={styles.form_body}>
              {formStep === 1 ? (
                <form onSubmit={handleSubmitPage1}>
                  <section>
                    <div
                      className={`${styles.form_input_container} ${styles.split_container}`}
                    >
                      <select
                        name="yearOfPassing"
                        type="text"
                        id="yop"
                        required
                        value={data.yearOfPassing}
                        onChange={handleChange}
                      >
                        <option value="" disabled selected hidden>
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
                        required
                        value={data.department}
                        onChange={handleChange}
                        onBlur={handleInputBlur}
                      >
                        <option value="" disabled selected hidden>
                          Department
                        </option>
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
                        id="graduationLevel"
                        required
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
                        required
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
                        required
                        placeholder="Register Number"
                        value={data.registerNumber}
                        onChange={handleChange}
                        onBlur={handleInputBlur}
                      />
                    </div>
                    <div
                      className={`${styles.form_input_container} ${styles.split_container}`}
                    >
                      <input
                        name="dateOfBirth"
                        type="date"
                        id="dateOfBirth"
                        required
                        value={data.dateOfBirth}
                        onChange={handleChange}
                        max="2022-04-17"
                      />
                      <input
                        name="email"
                        type="email"
                        id="email"
                        title="please enter a valid email address"
                        pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                        required
                        placeholder="Email"
                        value={data.email}
                        onChange={handleChange}
                        onBlur={handleInputBlur}
                      />
                    </div>
                    <div className={styles.form_input_container}>
                      <input
                        name="password"
                        type="password"
                        id="password"
                        title="password must be at least 8 characters"
                        pattern="[a-zA-Z0-9!@#$%^\*()]{8,}"
                        required
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
                        pattern="[a-zA-Z0-9!@#$%^\*()]{8,}"
                        required
                        placeholder="Confirm Password"
                        value={data.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                    {!isPasswordMatch && isCPasswordDirty && (
                      <p className={styles.validation_error}>
                        password does not match
                      </p>
                    )}
                    <div
                      className={`${styles.form_button_container} ${styles.split_container}`}
                    >
                      <button onClick={() => navigate("/login")}>
                        back to login
                      </button>
                      <button type="submit"> next page</button>
                    </div>
                  </section>
                </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  <section>
                    <div className={styles.form_input_container}>
                      <select
                        name="country"
                        type="text"
                        id="country"
                        required
                        placeholder="Select your country"
                        value={data.country}
                        onChange={handleChange}
                      >
                        {Country.getAllCountries(data.country).map(
                          (country) => (
                            <option value={country.isoCode}>
                              {country.flag} {country.name}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div className={`${styles.form_input_container} `}>
                      <select
                        name="state"
                        id="state"
                        required
                        placeholder="Select your state"
                        value={data.state}
                        onChange={handleChange}
                      >
                        {State.getStatesOfCountry(data.country).map((state) => (
                          <option value={state.isoCode}>{state.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.form_input_container}>
                      <select
                        name="city"
                        id="city"
                        required
                        placeholder="Enter your contact no"
                        value={data.city}
                        onChange={handleChange}
                      >
                        {City.getCitiesOfState(data.country, data.state).map(
                          (city) => (
                            <option value={city.name}>{city.name}</option>
                          )
                        )}
                      </select>
                    </div>

                    <div className={styles.form_input_container}>
                      <input
                        name="phoneNumber"
                        type="number"
                        id="phoneNumber"
                        pattern="[0-9]{10}"
                        required
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
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrationPageStudent;
