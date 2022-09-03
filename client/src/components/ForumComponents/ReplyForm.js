import { useAlertContext } from "context/alert/alertContext";
import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import React, { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Styles from "./ReplyForm.module.css";
const ReplyForm = ({ comment, onAddNewReply }) => {
  const { user } = useAuthContext();
  const [reply, setReply] = useState("");
  const { fetchData, isLoading, error } = useAxiosWithCallback();
  const { success } = useAlertContext();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!user?.token) {
      success("Sign in to create replies");
      navigate("/login");
      return;
    }
    const replyConfig = {
      url: `/api/v1/forum/reply/${comment._id}`,
      method: "post",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      data: {
        reply: reply,
      },
    };
    await fetchData(replyConfig, async (res) => {
      await onAddNewReply();
    });
  };

  return (
    <form className={Styles.reply_form_container} onSubmit={submitHandler}>
      <input
        placeholder="Your Reply Here"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />
      <button type="submit" className={Styles.reply_button}>
        <p>Reply to {comment.user.name}</p>
        <p className={Styles.share_icon}>
          <RiSendPlaneFill fontSize={25} />
        </p>
      </button>
    </form>
  );
};

export default ReplyForm;
