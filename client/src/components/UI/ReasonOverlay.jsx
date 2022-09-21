import React from "react";
import { GrClose } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";
import styles from "./ReasonOverlay.module.css";
function ReasonOverlay({
  reason,
  setReason,
  setIsShowReject,
  onRejectHandler,
}) {
  const handleSent = () => {
    setIsShowReject(false);
    onRejectHandler();
  };
  return (
    <div className={styles.overlay} onClick={() => setIsShowReject(false)}>
      <div
        className={`${styles.container} ${styles.reason}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h3>Reason</h3>
          <GrClose
            className={styles.close_btn}
            onClick={() => setIsShowReject(false)}
          />
        </div>
        <div className={styles.input_container}>
          <span
            class={styles.textarea}
            role="textbox"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={(e) => setReason(e.currentTarget.textContent)}
          >
            {reason}
          </span>
          <IoIosSend
            font-size={30}
            className={styles.send_btn}
            onClick={handleSent}
          />
        </div>
      </div>
    </div>
  );
}
export default ReasonOverlay;
