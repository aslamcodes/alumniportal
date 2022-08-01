import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationPageAlumni.module.css";
import Compguy from "assets/compguy.png";
import ApprovalCard from "components/RegistrationComponents/ApprovalCard";
import { register } from "context/auth/actions";
import { useAuthContext } from "context/auth/authContext";

const currentYear = new Date().getFullYear();
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const YearOfPassing = range(1985, currentYear, 1);
const Department = ["IT", "CSE", "ECE", "EEE", "MECH", "CIVIL", "MBA"];
const GraduationLevel = ["Under graduate", "Post graduate"];

function RegistrationPageAlumni() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [formOptions, setFormOptions] = useState({
    isEntrepreneur: "",
    isInHigherStudies: "",
  });
  const [form, setForm] = useState(1);
  const [requestCardActive, setRequestCardActive] = useState(false);
  const [data, setData] = useState({
    user: user?._id,
    yearOfPassing: "",
    department: "",
    graduationLevel: "",
    registerNumber: "",
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
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    Object.keys(formOptions);
    console.log(formData);
    // setRequestCardActive(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img src={Compguy} alt="register" />
      </div>
      <div className={styles.form_container}>
        <div className={styles.form}>
          <div className={styles.form_header}>
            <h1>Apply as Alumni</h1>
          </div>
          <div className={styles.form_body}>
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
                    className={formOptions.isInHigherStudies && styles.selected}
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

            <form onSubmit={handleSubmit}>
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
                    name="registerNumber"
                    type="text"
                    id="register_no"
                    placeholder="Register Number"
                    value={data.registerNumber}
                    onChange={handleChange}
                  />
                </div>
              </section>

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
                {/* <div
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
                  </div> */}
                {/* <div className={styles.form_input_container}>
                    <input
                      name="country"
                      type="text"
                      id="country"
                      placeholder="Select your country"
                      value={data.country}
                      onChange={handleChange}
                    />
                  </div> */}

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
                <div className={`${styles.form_button_container}`}>
                  <button type="submit"> Submit</button>
                </div>
              </section>
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
