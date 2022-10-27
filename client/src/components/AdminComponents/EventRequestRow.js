import { useAlertContext } from "context/alert/alertContext";
import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";
import styles from "./EventRequestRow.module.css";

const EventRequestRow = ({ data, onApproveHandler, onRejectHandler }) => {
  const startDate = new Date(data?.startDate);
  const endDate = new Date(data?.endDate);
  const { successAlert } = useAlertContext();

  return (
    <>
      <tr className={styles.event_request_row}>
        <td>{data?.createdBy?.registerNumber}</td>
        <td>{data?.createdBy?.name}</td>
        <td>{data?.eventName}</td>
        <td>{`${startDate.getDate()}/${
          startDate.getMonth() + 1
        }/${startDate.getFullYear()}`}</td>
        {/* <td>{`${endDate.getDay()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`}</td> */}
        <td>
          {startDate.getUTCHours()}:
          {(startDate.getUTCMinutes() < 10 && "0") + startDate.getUTCMinutes()}{" "}
        </td>
        <td>
          {endDate.getUTCHours()}:
          {(endDate.getUTCMinutes() < 10 && "0") + endDate.getUTCMinutes()}{" "}
        </td>
        <td>{data?.venue}</td>
        <td>
          {!data?.isApproved ? (
            <>
              <p
                onClick={() => {
                  onApproveHandler(data._id);
                  successAlert("Approved");
                }}
                className={styles.accept}
              >
                Approve
              </p>
              <p
                className={styles.decline}
                onClick={() => {
                  // TODO: Link Event reason overlay here, get the reason string
                  onRejectHandler(data._id);
                }}
              >
                Decline
              </p>
            </>
          ) : (
            <p>{data?.isApproved ? `Approved` : "Declined"} </p>
          )}
        </td>
      </tr>
    </>
  );
};

export default EventRequestRow;
