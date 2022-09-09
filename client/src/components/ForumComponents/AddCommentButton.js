import React, { useEffect, useRef, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { GrFormEdit } from "react-icons/gr";
import Styles from "./AddCommentButton.module.css";
import { useSpring, a } from "react-spring";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import { useAuthContext } from "context/auth/authContext";
import Loader from "components/UI/Loader";
import { useAlertContext } from "context/alert/alertContext";
import { useNavigate } from "react-router-dom";

const AddCommentButton = ({ postId, onAddComment }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [comment, setComment] = useState("");
  const inputRef = useRef(null);
  const props = useSpring({});
  const navigate = useNavigate();
  const { fetchData: createComment, isLoading, error } = useAxiosWithCallback();
  const { user } = useAuthContext();
  const { successAlert, errorAlert } = useAlertContext();

  useEffect(() => {
    if (error) errorAlert(error);
  }, [error, errorAlert]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.token) {
      errorAlert("Sign in to create comments on posts");
      navigate("/login");
      return;
    }

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
      className={`${Styles.comment_form} ${isFormOpen && Styles.comment_form_expanded
        }`}
    >
      <input
        ref={inputRef}
        value={comment}
        required
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
      <button type="submit">
        {isFormOpen ? <RiSendPlaneFill /> : <GrFormEdit />}
      </button>
    </a.form>
  );
};

export default AddCommentButton;
