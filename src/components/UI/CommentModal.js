import React, { useEffect } from "react";
import ReactPortal from "../ReactPortal";
import Styles from "./CommentModal.module.css";
import CommentStyles from "./CommentCard.module.css";
import Divider from "../Divider";
import { GrClose } from "react-icons/gr";

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
        <b onClick={() => {}}>Reply</b>
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
          e.stopPropagation();
          handleClose();
        }}
      >
        <section
          className={Styles.comment_modal_main}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={Styles.comment_modal_header_container}>
            <div className={Styles.comment_modal_header}>
              <h1>Comments</h1>
              <GrClose type="button" onClick={handleClose} />
            </div>
            <Divider />
          </div>

          <div className={Styles.comments_container}>
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
