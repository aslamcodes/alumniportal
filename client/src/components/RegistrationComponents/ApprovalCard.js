import React from 'react'
import styles from './ApprovalCard.module.css'
import { useNavigate } from "react-router-dom";
function ApprovalCard({ status, setActive }) {
  const navigate = useNavigate();
  const handleClick = () => {
    setActive(false);
    navigate('/login');
  }
  return (
    <div className={`${styles.approval_card} ${status && styles.approval_card_active}`}>
      <h2>Attention!</h2>
      <p>
        The approval has been sent successfully. Once your account has been verified, you will receive a confirmation mail in your registered Email id.
      </p>
      <button onClick={handleClick}>EXIT</button>
    </div>
  )
}

export default ApprovalCard