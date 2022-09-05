import React, { useState } from "react";
import styles from "./ResetPassword.module.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.form}>
          <form style={{ "align-items": "center" }}>
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
              <button>Change password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
