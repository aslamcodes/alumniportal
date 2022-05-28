import React, { useEffect } from "react";
import ReactPortal from "../ReactPortal";
import Styles from "./CommentModal.module.css";
const CommentModal = ({ handleClose, isOpen, children }) => {
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
      <div className={Styles.modal_container}>
        <section className="modal">
          {children}
          <button type="button" onClick={handleClose}>
            Close
          </button>
        </section>
      </div>
    </ReactPortal>
  );
};

export default CommentModal;
