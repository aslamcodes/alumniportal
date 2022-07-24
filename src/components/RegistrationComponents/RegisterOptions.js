import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./RegisterOptions.module.css";
function RegisterOptions({ active }) {
  const navigate = useNavigate();
  return (
    <div className={`${styles.register_options_container} ${active && styles.register_options_container_active}`}>
      <ul>

        <li onClick={() => navigate("/register-alumni")}>Alumni</li>
        <li onClick={() => navigate("/register-student")}>Student</li>
        <li onClick={() => navigate("/register-faculty")}>Faculty</li>
      </ul>
    </div>
  )
}

export default RegisterOptions