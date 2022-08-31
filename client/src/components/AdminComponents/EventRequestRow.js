import { useAlertContext } from "context/alert/alertContext";
import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";
import styles from "./EventRequestRow.module.css";

const RejectReasonOverlay = ({ setIsShowReject }) => {
  const [reason, setReason] = useState("");
  const handleSent = () => {
    console.log(reason);
    setReason("");
    setIsShowReject(false);
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
};

const EventRequestRow = ({ data, onApproveHandler }) => {
  const [isShowReject, setIsShowReject] = useState(false);
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  const { success } = useAlertContext();
  return (
    <>
      <tr className={styles.event_request_row}>
        <td>{data.createdBy.registerNumber}</td>
        <td>{data.createdBy.name}</td>
        <td>{data.eventName}</td>
        <td>{`${startDate.getDay()}/${
          startDate.getMonth() + 1
        }/${startDate.getFullYear()}`}</td>
        {/* <td>{`${endDate.getDay()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`}</td> */}
        <td>{`${startDate.getHours()}:${startDate.getMinutes()}`}</td>
        <td>{`${endDate.getHours()}:${endDate.getMinutes()}`}</td>
        <td>{data.venue}</td>
        <td>
          {!data.isApproved ? (
            <>
              <p
                onClick={() => {
                  onApproveHandler(data._id);
                  success("Approved");
                }}
                className={styles.accept}
              >
                Approve
              </p>
              <p
                className={styles.decline}
                onClick={() => setIsShowReject(true)}
              >
                Decline
              </p>
            </>
          ) : (
            <p>{data.isApproved ? `Approved` : "Declined"} </p>
          )}
        </td>
      </tr>
      {isShowReject && (
        <RejectReasonOverlay setIsShowReject={setIsShowReject} />
      )}
    </>
  );
};

export default EventRequestRow;
