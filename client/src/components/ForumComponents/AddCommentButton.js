import React, { useEffect, useRef, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { GrFormEdit } from "react-icons/gr";
import Styles from "./AddCommentButton.module.css";
import { useSpring, a } from "react-spring";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import { useAuthContext } from "context/auth/authContext";
import Loader from "components/UI/Loader";

const AddCommentButton = ({ postId, onAddComment }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [comment, setComment] = useState("");
  const inputRef = useRef(null);
  const props = useSpring({});

  const { fetchData: createComment, isLoading, error } = useAxiosWithCallback();
  const { user } = useAuthContext();

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentConfig = {
      url: `/api/v1/forum/comment/${postId}`,
      method: "post",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      data: {
        comment,
      },
    };

    await createComment(commentConfig, async (res) => {
      await onAddComment();
      if (!error) alert("Commented Successfully");
    });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <a.form
      style={props}
      onSubmit={handleSubmit}
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
      <button>{isFormOpen ? <RiSendPlaneFill /> : <GrFormEdit />}</button>
    </a.form>
  );
};

export default AddCommentButton;
