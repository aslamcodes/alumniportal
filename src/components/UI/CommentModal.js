import React, { useEffect } from "react";
import ReactPortal from "../ReactPortal";
import Styles from "./CommentModal.module.css";
import CommentStyles from "./CommentReplyCard.module.css";

const CommentBox = ({ commentData }) => {
  const { user, comment, replies } = commentData;
  return (
    <div className={CommentStyles.comment_box}>
      <div className={CommentStyles.comment_container}>
        <img
          src={user.profile_image}
          className={CommentStyles.user_profile_image}
        />
        <p>{comment}</p>
        <p>Reply</p>
      </div>
      <div>
        {replies.map((reply, idx) => (
          <div
            className={`${CommentStyles.comment_container} ${CommentStyles.reply_container}`}
            key={`${reply}${idx}`}
          >
            <p>{reply.text}</p>
            <img src={reply.user_profile_picture} />
          </div>
        ))}
      </div>
    </div>
  );
};

const CommentModal = ({ handleClose, isOpen, comments }) => {
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <ReactPortal wrapperId="comment_modal_wrapper">
      <div
        className={Styles.modal_container}
        onClick={(e) => {
          handleClose();
        }}
      >
        <section
          className={Styles.comment_modal_main}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={Styles.comment_modal_header}>
            <h1>Comments</h1>
            <button type="button" onClick={handleClose}>
              Close
            </button>
          </div>
          <div>
            {comments.map((comment, idx) => (
              <CommentBox
                key={`${comment.user.name}${comment.comment}}${idx}`}
                commentData={comment}
              />
            ))}
          </div>
        </section>
      </div>
    </ReactPortal>
  );
};

export default CommentModal;
