import React from "react";
import Styles from "./ReplyForm.module.css";
const ReplyForm = () => {
  return (
    <div className={Styles.reply_form_container}>
      <textarea rows={0} placeholder="Your Reply Here" />
      <div className={Styles.reply_button}>
        <p>Reply to Zahra</p>
        <p className={Styles.share_icon}>Send</p>
      </div>
    </div>
  );
};

export default ReplyForm;
