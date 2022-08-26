import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationPageAlumni.module.css";
import Compguy from "assets/compguy.png";
import ApprovalCard from "components/RegistrationComponents/ApprovalCard";
import { useAuthContext } from "context/auth/authContext";
import { applyAsAlumni } from "context/alumni/actions";
import {
  useAlumniContext,
  useAlumniDispatchContext,
} from "context/alumni/alumniContext";
import Loader from "components/UI/Loader";


function RegistrationPageAlumni() {
  const navigate = useNavigate();
  const dispatch = useAlumniDispatchContext();
  const { user } = useAuthContext();
  const { error, isLoading, alumni } = useAlumniContext();
  const [formOptions, setFormOptions] = useState({
    isEntrepreneur: false,
    isInHigherStudies: false,
  });
  const [requestCardActive, setRequestCardActive] = useState(false);
  const [data, setData] = useState({
    user: user?._id,
    companyName: "",
    companyEmail: "",
    companyPan: "",
    companyTin: "",
    secondaryCollegeName: "",
    courseName: "",
    designation: "",
    organization: "",
  });

  useEffect(() => {
    !user && navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    error && alert(error);
    alumni && navigate("/");
  }, [error, alumni, navigate]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        delete data[key];
      }
    });
    await applyAsAlumni(dispatch, { ...data, ...formOptions });
  };

  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img src={Compguy} alt="register" />
      </div>
      {!isLoading ? (
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

              <form onSubmit={handleSubmit}>
                <section className={styles.form_section}>
                  {formOptions.isEntrepreneur && (
                    <section>
                      <div
                        className={`${styles.form_input_container} `}
                      >
                        <input
                          name="companyName"
                          type="text"
                          id="companyName"
                          placeholder="Company Name"
                          value={data.companyName}
                          onChange={handleChange}
                        />

                      </div>
                      <div
                        className={`${styles.form_input_container} ${styles.split_container}`}
                      >
                        <input
                          name="companyPanNumber"
                          type="text"
                          id="companyPanNumber"
                          placeholder="Company Pan"
                          value={data.companyPan}
                          onChange={handleChange}
                        />
                        <input
                          name="companyTinNumber"
                          type="text"
                          id="companyTinNumber"
                          placeholder="Company Tin"
                          value={data.companyTin}
                          onChange={handleChange}
                        />
                      </div>
                    </section>
                  )}
                  {formOptions.isInHigherStudies && (
                    <div
                      className={`${styles.form_input_container} ${styles.split_container}`}
                    >
                      <input
                        name="secondaryCollegeName"
                        type="text"
                        id="secondaryCollegeName"
                        placeholder="College Name"
                        value={data.secondaryCollegeName}
                        onChange={handleChange}
                      />
                      <input
                        name="courseName"
                        type="text"
                        id="courseName"
                        placeholder="Course Name"
                        value={data.courseName}
                        onChange={handleChange}
                      />
                    </div>
                  )}
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
                  <div
                    className={`${styles.form_input_container} `}
                  >
                    <input
                      name="companyEmail"
                      type="text"
                      id="companyEmail"
                      placeholder="Company Email ID"
                      value={data.companyEmail}
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
      ) : (
        <Loader />
      )}

      <ApprovalCard
        status={requestCardActive}
        setActive={setRequestCardActive}
      />
    </div>
  );
}

export default RegistrationPageAlumni;
