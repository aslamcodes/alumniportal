import React from "react";
import Styles from "./ReplyBox.module.css";
const ReplyBox = ({ reply }) => {
  return (
    <div className={Styles.reply_box}>
      <img src={reply.user_profile_picture} />
      <p className={Styles.username}>{reply.username}</p>
      <p>{reply.text}</p>
    </div>
  );
};

export default ReplyBox;
