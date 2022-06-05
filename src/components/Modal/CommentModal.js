import React, { useEffect, useState } from "react";
import ReactPortal from "../ReactPortal";
import Styles from "./CommentModal.module.css";
import Divider from "../Divider";
import { GrClose } from "react-icons/gr";
import CommentBox from "../UI/CommentBox";
import AddCommentButton from "../UI/AddCommentButton";

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
        className={Styles.modal_overlay}
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
            <AddCommentButton />
          </div>
        </section>
      </div>
    </ReactPortal>
  );
};

export default CommentModal;
