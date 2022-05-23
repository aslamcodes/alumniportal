import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./LoginPage.module.css";


// icons
import ErrorIcon from "@mui/icons-material/Error";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

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
    <div className={`${styles.loginBox} `}>
      <p className={`${styles.loginTitle}`}>Login Now</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={` ${styles.loginBodyContainer}`}>
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
          <div className={styles["terms-conditions"]}>
            <p>
              By login you agree to our <a>Terms & conditions</a>
            </p>
          </div>
        </div>
        <div className={` ${styles.loginButtonContainer}`}>
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
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (

    <div className={`${styles.body}`}>

      {windowDimensions.width > 790 &&
        <div className={`${styles.welcomeContainer}`}>
          <div className={`${styles.welcomeBox}`}>
            <p>Welcome Back Alumnis We are excited!</p>
          </div>
          {windowDimensions.width > 1040 &&
            <div className={`${styles.humanImgContainer}`} ></div>
          }
        </div>
      }
      <div className={`${styles.loginContainer}`}>
        <LoginForm />
      </div>
      {windowDimensions.width > 790 &&
        <div className={styles["down-part"]}></div>
      }
    </div >


  );
};

export default LoginPage;
