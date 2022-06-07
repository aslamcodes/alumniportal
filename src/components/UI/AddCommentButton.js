import React, { useRef, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { GrFormEdit } from "react-icons/gr";
import Styles from "./AddCommentButton.module.css";
import { useSpring, a } from "react-spring";
const AddCommentButton = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [comment, setComment] = useState("");
  const inputRef = useRef(null);
  const props = useSpring({});
  return (
    <a.form
      style={props}
      onSubmit={(e) => {
        e.preventDefault();
      }}
      onClick={() => {
        setIsFormOpen(true);
        inputRef.current.focus();
      }}
      className={`${Styles.comment_form} ${
        isFormOpen && Styles.comment_form_expanded
      }`}
    >
      <input
        ref={inputRef}
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        placeholder={isFormOpen ? "Your Comment Here" : "Add a Comment"}
        onBlur={() => {
          if (comment.trim().length === 0) {
            setIsFormOpen(false);
            setComment("");
          }
        }}
      />
      {isFormOpen ? <RiSendPlaneFill /> : <GrFormEdit />}
    </a.form>
  );
};

export default AddCommentButton;
