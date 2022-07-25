import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationPageFaculty.module.css";
import Compguy from "assets/compguy.png";


function RegistrationPageFaculty() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactno: "",
  });


  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img src={Compguy} alt="register image" />
      </div>
      <div className={styles.form_container}>
        <div className={styles.form}>
          <div className={styles.form_header}>
            <h1>Login Information</h1>
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
                <div
                  className={`${styles.form_input_container} `}
                >
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
                    name="contactno"
                    type="number"
                    id="contactno"
                    placeholder="Enter your contact no"
                    value={data.contactno}
                    onChange={handleChange}
                  />
                </div>
                <div
                  className={`${styles.form_button_container} ${styles.split_container}`}
                >
                  <button onClick={() => navigate("/login")}>
                    back to login
                  </button>
                  <button type="submit"> Submit</button>
                </div>
              </section>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPageFaculty;

