import React from 'react'
import styles from './EventCard.module.css'
const EventCard = () => {
  return (
    <div className={styles["event-card"]}>
      <div className={styles['date']}>
        <p>01</p>
        <p>JAN</p>
      </div>
      <div className={styles['title']}>
        <p>SIH-2022</p>
      </div>
      <div className={styles['venue']}>
        <p>2:30pm - 4:30pm</p>
        <p>@Seminar Hall SKCT</p>

      </div>


    </div>
  )
}

export default EventCard