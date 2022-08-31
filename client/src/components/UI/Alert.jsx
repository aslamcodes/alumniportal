import { useAlertContext } from "context/alert/alertContext";
import { AlertStatus, AnimationTypes } from "lib/enum";
import React from "react";
import styles from "./Alert.module.css";
import Modal from "./Modal";

const Alert = ({ ...props }) => {
  const { alert, alertText, clear } = useAlertContext();

  return (
    <Modal
      {...props}
      scrollable={true}
      handleClose={clear}
      isOpen={alert !== AlertStatus.NONE}
      animation={AnimationTypes.FROM_TOP}
    >
      <div className={styles.modal_main}>
        <p className={styles.modal_message}>{alertText}</p>
        <div className={styles.modal_actions}>
          {/* <button onClick={clear}>Cancel</button> */}
          <button className={styles.primary} onClick={clear}>
            Ok
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Alert;
