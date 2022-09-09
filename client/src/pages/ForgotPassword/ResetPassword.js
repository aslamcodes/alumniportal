import React, { useEffect, useState } from "react";
import styles from "./ResetPassword.module.css";
import changePassword from "assets/changePassword.png";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";

import { useAlertContext } from "context/alert/alertContext";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const { fetchData: updatePassword } = useAxiosWithCallback();
  const { successAlert, errorAlert } = useAlertContext();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromQuery = searchParams.get("token");

    if (tokenFromQuery) {
      setToken(tokenFromQuery);
      searchParams.delete("token");
      setSearchParams(searchParams);
    }

    const userFromQuery = searchParams.get("user");

    if (userFromQuery) {
      setUser(searchParams.get("user"));
      searchParams.delete("user");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      url: "/api/v1/users/reset-password",
      method: "patch",
      data: { token, user, password: newPassword },
    };

    updatePassword(config, () => {
      successAlert("Password updated successfully");
    });
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img src={changePassword} alt="reset password" />
      </div>
      <div className={styles.form_container}>
        <div className={styles.form}>
          <div className={styles.form_header}>
            <h1>Reset Password</h1>
          </div>
          <div className={styles.form_body}>
            <form style={{ "align-items": "center" }} onSubmit={handleSubmit}>
              <div className={styles.form_input_container}>
                <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </div>
              <br />
              <div className={styles.form_input_container}>
                <input
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              <div className={styles.form_actions_container}>
                <button type="submit">Change password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
