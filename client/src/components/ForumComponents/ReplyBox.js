import React from "react";
import Styles from "./ReplyBox.module.css";
const ReplyBox = ({ reply }) => {
  return (
    <div className={Styles.reply_box}>
      <div className={Styles.header}>
        <img
          src={`http://localhost:8000/api/v1/users/user-avatar/${reply.user._id}`}
          alt={"profile"}
        />
        <p className={Styles.username}>{reply.user.name}</p>
      </div>
      <p>{reply.reply}</p>
    </div>
  );
};

export default ReplyBox;
