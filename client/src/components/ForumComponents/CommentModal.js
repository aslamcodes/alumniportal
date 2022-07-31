import React, { useEffect } from "react";
import ReactPortal from "components/Modal/ReactPortal";
import Styles from "./CommentModal.module.css";
import Divider from "components/UI/Divider";
import { GrClose } from "react-icons/gr";
import CommentBox from "components/ForumComponents/CommentBox";
import AddCommentButton from "components/ForumComponents/AddCommentButton";
import { animated, config, useTransition } from "react-spring";

const CommentModal = ({ handleClose, isOpen, comments }) => {
  const modalTransition = useTransition(isOpen, {
    config: config.wobbly,
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
    reverse: true,
    delay: 10,
  });

  const modalOverlayTransition = useTransition(isOpen, {
    from: {
      opacity: 0,
      // backdropFilter: "blur(0)",
    },
    enter: {
      opacity: 1,
      // backdropFilter: "blur(10px)",
    },
    leave: {
      opacity: 0,
      // backdropFilter: "blur(0)",
    },
  });

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  return modalOverlayTransition(
    (style, item) =>
      item && (
        <ReactPortal wrapperId="comment_modal_wrapper">
          <animated.div
            style={style}
            className={Styles.modal_overlay}
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          >
            {modalTransition(
              (style, item) =>
                item && (
                  <animated.section
                    style={style}
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
                          key={`${comment.user.name}${comment._id}}${idx}`}
                          commentData={comment}
                        />
                      ))}
                      <AddCommentButton />
                    </div>
                  </animated.section>
                )
            )}
          </animated.div>
        </ReactPortal>
      )
  );
};

export default CommentModal;
