import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationPageAlumni.module.css";
import Compguy from "assets/compguy.png";
import ApprovalCard from "components/RegistrationComponents/ApprovalCard";
import { register } from "context/auth/actions";

const currentYear = new Date().getFullYear();
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const YearOfPassing = range(1985, currentYear, 1);
const Department = ["IT", "CSE", "ECE", "EEE", "MECH", "CIVIL", "MBA"];
const GraduationLevel = ["Under graduate", "Post graduate"];

function RegistrationPageAlumni() {
  const navigate = useNavigate();
  const [formOptions, setFormOptions] = useState({
    isEntrepreneur: "",
    isInHigherStudies: "",
  });
  const [form, setForm] = useState(1);
  const [requestCardActive, setRequestCardActive] = useState(false);
  const [data, setData] = useState({
    yearOfPassing: "",
    department: "",
    graduationLevel: "",
    name: "",
    registerNumber: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyMail: "",
    secondaryCollegeName: "",
    courseName: "",
    designation: "",
    organization: "",
    city: "",
    state: "",
    country: "",
    contactNo: "",
    domain: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setRequestCardActive(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img src={Compguy} alt="register image" />
      </div>
      <div className={styles.form_container}>
        <div className={styles.form}>
          <div className={styles.form_header}>
            <h1>{form === 1 ? "Register" : "Personal Information"}</h1>
          </div>
          <div className={styles.form_body}>
            {form === 2 && (
              <div className={styles.form_options}>
                <div>
                  <div className={styles.name}>
                    <p>Are you an entrepreneur</p>
                  </div>
                  <div className={styles.options}>
                    <button
                      className={!formOptions.isEntrepreneur && styles.selected}
                      onClick={() =>
                        setFormOptions({
                          ...formOptions,
                          isEntrepreneur: false,
                        })
                      }
                    >
                      no
                    </button>
                    <button
                      className={formOptions.isEntrepreneur && styles.selected}
                      onClick={() =>
                        setFormOptions({ ...formOptions, isEntrepreneur: true })
                      }
                    >
                      yes
                    </button>
                  </div>
                </div>
                <div>
                  <div className={styles.name}>
                    <p>Are you doing higher studies </p>
                  </div>
                  <div className={styles.options}>
                    <button
                      className={
                        !formOptions.isInHigherStudies && styles.selected
                      }
                      onClick={() =>
                        setFormOptions({
                          ...formOptions,
                          isInHigherStudies: false,
                        })
                      }
                    >
                      no
                    </button>
                    <button
                      className={
                        formOptions.isInHigherStudies && styles.selected
                      }
                      onClick={() =>
                        setFormOptions({
                          ...formOptions,
                          isInHigherStudies: true,
                        })
                      }
                    >
                      yes
                    </button>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {form === 1 ? (
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
                        year of passing
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
                      {GraduationLevel.map((level) => (
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
                      name="dob"
                      type="date"
                      id="dob"
                      value={data.dob}
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
                    <button onClick={() => setForm(2)}> next page</button>
                  </div>
                </section>
              ) : (
                <section>
                  {formOptions.isEntrepreneur && (
                    <div
                      className={`${styles.form_input_container} ${styles.split_container}`}
                    >
                      <input
                        name="cname"
                        type="text"
                        id="cname"
                        placeholder="Company Name"
                        value={data.companyName}
                        onChange={handleChange}
                      />
                      <input
                        name="cemail"
                        type="text"
                        id="cemail"
                        placeholder="Company Email ID"
                        value={data.companyMail}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                  {formOptions.isInHigherStudies && (
                    <div
                      className={`${styles.form_input_container} ${styles.split_container}`}
                    >
                      <input
                        name="clgname"
                        type="text"
                        id="clgname"
                        placeholder="College Name"
                        value={data.secondaryCollegeName}
                        onChange={handleChange}
                      />
                      <input
                        name="crname"
                        type="text"
                        id="crname"
                        placeholder="Course Name"
                        value={data.courseName}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                  <div className={styles.form_input_container}>
                    <input
                      name="designation"
                      type="text"
                      id="designation"
                      placeholder="Your designation (working professional)"
                      value={data.designation}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.form_input_container}>
                    <input
                      name="organization"
                      type="text"
                      id="organization"
                      placeholder="Organization name"
                      value={data.organization}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`${styles.form_input_container} ${styles.split_container}`}
                  >
                    <input
                      name="city"
                      type="text"
                      id="city"
                      placeholder="Select your city"
                      value={data.city}
                      onChange={handleChange}
                    />
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
                      name="contactno"
                      type="number"
                      id="contactno"
                      placeholder="Enter your contact no"
                      value={data.contactNo}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.form_input_container}>
                    <input
                      name="skill"
                      type="text"
                      id="skill"
                      placeholder="Skill/Domain"
                      value={data.domain}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`${styles.form_button_container} ${styles.split_container}`}
                  >
                    <button onClick={() => setForm(1)}>Back</button>
                    <button type="submit"> Submit</button>
                  </div>
                </section>
              )}
            </form>
          </div>
        </div>
      </div>

      <ApprovalCard
        status={requestCardActive}
        setActive={setRequestCardActive}
      />
    </div>
  );
}

export default RegistrationPageAlumni;
