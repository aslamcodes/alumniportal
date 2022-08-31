import ReactPortal from "components/Modal/ReactPortal";
import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import { a, config, useTransition } from "react-spring";

const Modal = ({ animation, scrollable, handleClose, isOpen, children }) => {
  const modalTransitions = useTransition(isOpen, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
    config: config.wobbly,
  });

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  return modalTransitions(
    (style, item) =>
      item && (
        <ReactPortal scrollable={scrollable} wrapperId="general-modal">
          <a.div className={styles.modal_overlay} style={style}>
            {children}
          </a.div>
        </ReactPortal>
      )
  );
};

export default Modal;
