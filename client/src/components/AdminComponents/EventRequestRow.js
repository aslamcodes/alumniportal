import React from 'react'
import styles from './EventRequestRow.module.css';

const EventRequestRow = ({ data, onApproveHandler }) => {

  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  console.log("by:" + data);

  return (

    <tr className={styles.event_request_row}>

      <td>{data.createdBy.registerNumber}</td>
      <td>{data.createdBy.name}</td>
      <td>{data.eventName}</td>
      <td>{`${startDate.getDay()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`}</td>
      {/* <td>{`${endDate.getDay()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`}</td> */}
      <td>{`${startDate.getHours()}:${startDate.getMinutes()}`}</td>
      <td>{`${endDate.getHours()}:${endDate.getMinutes()}`}</td>
      <td>{data.venue}</td>
      <td>{!data.isApproved ? (
        <>
          <p onClick={() => { onApproveHandler(data._id); alert("Approved") }} className={styles.accept}>
            Approve
          </p>
          <p className={styles.decline} >
            Decline
          </p>
        </>
      ) : <p>{data.isApproved ? "Approved" : "Declined"} </p>}</td>
    </tr>

  )
}

export default EventRequestRow