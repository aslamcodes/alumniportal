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
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAuthDispatchContext();
  const { user, error, isLoading } = useAuthContext();
  const { success } = useAlertContext();

  const [data, setData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    city: "",
    department: "",
  });

  useEffect(() => {
    if (error) success(error);
  }, [error, success]);

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
                      value={data.dob}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.form_input_container}>
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
                      name="city"
                      id="city"
                      placeholder="City"
                      value={data.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.form_input_container}>
                    <input
                      name="department"
                      id="department"
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
