import React from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import Styles from "./ReplyForm.module.css";
const ReplyForm = () => {
  return (
    <div className={Styles.reply_form_container}>
      <input placeholder="Your Reply Here" />
      <div className={Styles.reply_button}>
        <p>Reply to Zahra</p>
        <p className={Styles.share_icon}>
          <RiSendPlaneFill />
        </p>
      </div>
    </div>
  );
};

export default ReplyForm;
