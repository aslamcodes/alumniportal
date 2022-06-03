import React, { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { GrFormEdit } from "react-icons/gr";
import Styles from "./AddCommentButton.module.css";
const AddCommentButton = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [comment, setComment] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      onClick={() => {
        setIsFormOpen(true);
      }}
      className={`${Styles.comment_form} ${
        isFormOpen && Styles.comment_form_expanded
      }`}
    >
      <input
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        placeholder={isFormOpen ? "Your Comment Here" : "Add a Comment"}
        onBlur={() => {
          setIsFormOpen(false);
          if (comment.trim().length === 0) {
            setComment("");
          }
        }}
      />
      {isFormOpen ? <RiSendPlaneFill /> : <GrFormEdit />}
    </form>
  );
};

export default AddCommentButton;
