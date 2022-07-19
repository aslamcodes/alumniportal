import React, { useState } from 'react'
import styles from './AddEventCard.module.css'
const AddEventCard = () => {
  const [newEventData, setNewEventData] = useState({
    title: '',
    date: '2022-07-13',
    startTime: '11:00',
    endTime: '14:00',
    location: '',
  })

  const handleChange = (e) => {
    setNewEventData({
      ...newEventData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className={styles.add_event_card}>
      <form action="">
        <div className={styles.input_container}>
          <label htmlFor="eventName">Title</label>
          <input type="text" name="title" id="eventName" placeholder="Event Name" value={newEventData.title} onChange={handleChange} />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="eventDate">Date</label>
          <input type="date" name="date" id="eventDate" value={newEventData.date} onChange={handleChange} />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="eventTime">Time</label>
          <div className={styles.split_container}>
            <div className={styles.input_container}>
              <input type="time" name="startTime" id="eventStart" value={newEventData.startTime} onChange={handleChange} />
            </div>
            <p>To</p>
            <div className={styles.input_container}>
              <input type="time" name="endTime" id="eventEnd" value={newEventData.endTime} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className={styles.input_container}>
          <label htmlFor="eventLocation">Location</label>
          <input type="text" name="location" id="eventLocation" placeholder="@venue" value={newEventData.location} onChange={handleChange} />
        </div>
        <div className={styles.add_event_button}>
          <div className={styles.submit_button} type="submit">Add Event
            <img src={require("assets/icons/send.png")} alt="send icon" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddEventCard