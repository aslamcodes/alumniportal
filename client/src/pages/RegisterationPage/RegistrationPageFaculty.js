import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./RegistrationPageFaculty.module.css";
import Compguy from "assets/compguy.png";
import {
  useAuthContext,
  useAuthDispatchContext,
} from "context/auth/authContext";
import { register } from "context/auth/actions";
import Loader from "components/UI/Loader";
import { useAlertContext } from "context/alert/alertContext";

function RegistrationPageFaculty() {
  useEffect(() => {
    document.title = "Alumni Portal | Register Faculty"
  }, []);

  const today = new Date().toJSON().slice(0, 10);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAuthDispatchContext();
  const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const { user, error, isLoading } = useAuthContext();
  const { errorAlert } = useAlertContext();
  const graduationLevelOptions = ["Under graduate", "Post graduate", "Others"];

  const [data, setData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    graduationLevel: "",
    city: "",
    department: "",
  });

  useEffect(() => {
    if (error) errorAlert(error);
  }, [error, errorAlert]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "confirmPassword") {
      setIsCPasswordDirty(true);
    }
    if (e.target.name === "phoneNumber") {
      setData({
        ...data,
        [e.target.name]: e.target.value.slice(0, 10)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
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
  }, [data.password, data.confirmPassword, isCPasswordDirty])

  if (user) {
    navigate(location?.state?.from ?? "/");
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
              <h1>Faculty Registration</h1>
            </div>
            <div className={styles.form_body}>
              <form onSubmit={handleSubmit}>
                <section>
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
                  <div className={`${styles.form_input_container} `}>
                    <input
                      name="dob"
                      type="date"
                      id="dob"
                      required
                      value={data.dob}
                      onChange={handleChange}
                      max={today}
                    />
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
                      <option value="" disabled selected hidden>Graduation level</option>
                      {graduationLevelOptions.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.form_input_container}>
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
                  {!isPasswordMatch && isCPasswordDirty && <p className={styles.validation_error}>password does not match</p>}
                  <div className={styles.form_input_container}>
                    <input
                      name="phoneNumber"
                      type="number"
                      id="phoneNumber"
                      required
                      placeholder="Enter your contact no"
                      value={data.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.form_input_container}>
                    <input
                      name="city"
                      id="city"
                      required
                      placeholder="City"
                      value={data.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.form_input_container}>
                    <input
                      name="department"
                      id="department"
                      required
                      placeholder="Department"
                      value={data.department}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`${styles.form_button_container} ${styles.split_container}`}
                  >
                    <button onClick={() => navigate("/login")}>
                      back to login
                    </button>
                    <button type="submit">Submit</button>
                  </div>
                </section>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrationPageFaculty;
