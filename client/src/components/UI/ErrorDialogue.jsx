import React from "react";
import { IoWarningOutline } from "react-icons/io5";
import styles from "./ErrorDialogue.module.css";

const ErrorDialogue = ({ errorMessage }) => {
  return (
    <div className={styles.error_container}>
      <IoWarningOutline fontSize={30} />
      {errorMessage}
    </div>
  );
};

export const ErrorWrapper = (props) => (
  <div className={styles.error_wrapper}>
    <ErrorDialogue {...props} />
  </div>
);

export default ErrorDialogue;
