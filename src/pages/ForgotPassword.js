import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import hypocrisy from "../assets/forgotPassword.png";
import verification from "../assets/verification.png";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
  const [form, setForm] = useState(1);
  const [data, setData] = useState({
    email: "",
    phoneNo: "",
    otp: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }



  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img src={
          form === 1 && hypocrisy || form === 2 && verification || form === 3 && hypocrisy
        } alt="forgot password image" />
      </div>
      <div className={styles.form_container}>
        <div className={styles.form}>
          <div className={styles.form_header}>
            <h1>{
              form === 1 && "Forgot Password" ||
              form === 2 && "Verification" ||
              form === 3 && "Change password"
            }</h1>
          </div>
          <div className={styles.form_body}>
            {form === 1 && (
              // form 1
              < form >
                <div className={styles.form_input_container}>
                  <input name="email" id="email" type="text" placeholder="Enter your email ID" value={data.email} onChange={handleChange} />
                </div>
                <p>Or</p>
                <div className={styles.form_input_container}>
                  <input name="phoneNo" id="phoneNo" type="text" placeholder="Enter your Phone number" value={data.phoneNo} onChange={handleChange} />
                </div>
                <div className={styles.form_actions_container}>
                  <Link to='/login'>Back to Login</Link>
                  <button onClick={() => setForm(2)}>Next</button>
                </div>
              </form>
            )}

            {form === 2 && (
              // form 2
              <form
                style={{ "align-items": 'center' }}
              >
                <div className={styles.form_input_container}>
                  <input name="otp" id="otp" type="number" placeholder="Enter the OTP" value={data.otp} onChange={handleChange} />
                </div>
                <div className={styles.form_vactions_container}>

                  <p>
                    Didn't recieve code?{" "}
                    {/* <Link to="/register"> */}
                    <span>Request Again</span>
                    {/* </Link> */}
                  </p>
                  <p onClick={() => setForm(1)}>Change Phone Number/Email ID</p>
                </div>
                <div className={styles.form_actions_container}>
                  <button >Change password</button>
                </div>
              </form>
            )}

            {form === 3 && (
              // form 3
              < form >
                <div className={styles.form_input_container}>
                  <input name="email" id="email" type="text" placeholder="Enter your email ID" value={data.email} onChange={handleChange} />
                </div>
                <p>Or</p>
                <div className={styles.form_input_container}>
                  <input name="phoneNo" id="phoneNo" type="text" placeholder="Enter your Phone number" value={data.phoneNo} onChange={handleChange} />
                </div>
                <div className={styles.form_actions_container}>
                  <Link to='/login'>Back to Login</Link>
                  <button >Next</button>
                </div>
              </form>
            )}

          </div>
          <hr />
          <div className={styles.form_footer}>
            <p>
              Don't have an account yet?{" "}
              <Link to="/register">
                <span>Create Account</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div >
  )
};

export default ForgotPassword;
