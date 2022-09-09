import { useAlertContext } from "context/alert/alertContext";
import { AlertStatus, AnimationTypes } from "lib/enum";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";

import { IoCloseOutline, IoWarningOutline } from "react-icons/io5";
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
        {alert === AlertStatus.ERROR && <IoWarningOutline fontSize={60} />}
        {alert === AlertStatus.SUCCESS && <BsCheckCircle fontSize={60} />}
        {alert === AlertStatus.FAILED && <AiOutlineCloseCircle fontSize={60} />}

        <p className={styles.modal_message}>{alertText}</p>
        <IoCloseOutline className={styles.close_btn} onClick={clear} />
      </div>
    </Modal>
  );
};

export default Alert;
