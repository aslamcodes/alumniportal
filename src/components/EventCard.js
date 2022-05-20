import React from 'react'
import styles from './EventCard.module.css'
const EventCard = ({ isActive }) => {
  return (
    <div className={`${styles.event_card} ${isActive && styles.active}`}>
      <div className={styles['date']}>
        <p>01</p>
        <p>JAN</p>
      </div>
      <div className={styles['title']}>
        <p>Fiesta-2022</p>
      </div>
      <div className={styles['venue']}>
        <p>2:30pm - 4:30pm</p>
        <p>@Seminar Hall SKCT</p>

      </div>


    </div>
  )
}

export default EventCard