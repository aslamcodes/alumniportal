import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./LoginPage.module.css";
import KandiHuman from "../assets/kandiHuman.png";
import { ReactComponent as DownPart } from "../assets/down_part.svg";
import Navbar from "../components/Navbar";
import ErrorIcon from "@mui/icons-material/Error";
const LoginForm = () => {
  let navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    navigate("/");
    console.log(data);
  };
  return (
    <div className={`${styles.loginContainer} ${styles.flex_col}`}>
      <p className={`${styles.loginTitle}`}>Login Now</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${styles.flex_col} ${styles.loginBodyContainer}`}>
          <p>Username</p>
          <div className={styles["input"]}>
            <input
              type="text"
              placeholder="Username"
              {...register("userName", { required: true })}
              className={styles["input-field"]}
            />
            {errors.userName && (
              <i>
                <ErrorIcon style={{ color: "red" }} />
              </i>
            )}
          </div>
          {errors.userName && <span>Username is required</span>}
          <div className={styles["input"]}>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
              className={styles["input-field"]}
            />
            {errors.password && (
              <i>
                <ErrorIcon style={{ color: "red" }} />
              </i>
            )}
          </div>

          {errors.password && <span>Password is required</span>}
          <p>
            By login you agree to our <a>Terms & conditions</a>
          </p>
        </div>
        <div className={`${styles.flex_row} ${styles.loginButtonContainer}`}>
          <button>Login Now</button>
          <p>
            <Link to="/forgot-password">
              <a>Forgot Password</a>
            </Link>
          </p>
        </div>
      </form>
      <hr />
      <p>
        Dont have an account yet ?{" "}
        <Link to="/register">
          <a>Create Account</a>
        </Link>
      </p>
    </div>
  );
};
const LoginPage = () => {
  return (
    <div className={`${styles.LoginPage} ${styles.flex_col}`}>
      <div className={`${styles.flex_row} ${styles.body}`}>
        <div className={`${styles.leftContainer}`}>
          <div className={`${styles.welcomeContainer}`}>
            <p>Welcome Back Aluminis We are excited!</p>
          </div>
          <img src={KandiHuman} alt="" className={styles.kandiHuman} />
        </div>
        <div className={`${styles.rightContainer}`}>
          <LoginForm />
        </div>
      </div>
      <div className={styles["down-part"]}></div>
    </div>
  );
};

export default LoginPage;
