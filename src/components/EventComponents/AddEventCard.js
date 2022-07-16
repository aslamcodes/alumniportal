import React from 'react'
import styles from './AddEventCard.module.css'
function AddEventCard() {
  return (
    <div className={styles.add_event_card}>
      <form action="">
        <div className={styles.input_container}>
          <label htmlFor="eventName">Title</label>
          <input type="text" name="" id="eventName" />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="eventDate">Date</label>
          <input type="date" name="eventDate" id="eventDate" />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="eventTime">Time</label>
          <div className={styles.split_container}>
            <div className={styles.input_container}>
              <input type="time" name="eventTime" id="eventStart" />
            </div>
            <p>To</p>
            <div className={styles.input_container}>
              <input type="time" name="eventTime" id="eventEnd" />
            </div>
          </div>
        </div>
        <div className={styles.input_container}>
          <label htmlFor="eventLocation">Location</label>
          <input type="text" name="eventLocation" id="eventLocation" />
        </div>
        <div className={styles.add_event_button}>

        </div>
      </form>
    </div>
  )
}

export default AddEventCard