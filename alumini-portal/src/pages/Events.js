import React, { useState } from 'react'
import EventCard from '../components/EventCard'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
import styles from './Events.module.css';

const Events = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={styles["event_page"]} >
      <Navbar />
      <div className={styles["event_page_content"]}>
        <div className={styles["title"]}>
          <p><span>U</span>PCOMING <span>E</span>VENTS</p>
        </div>
        <div className={styles["events"]} >
          <EventCard isActive={true} />
          <EventCard isActive={isActive} />
          <EventCard isActive={isActive} />
          <EventCard isActive={isActive} />
          <EventCard isActive={isActive} />
          <EventCard isActive={isActive} />
          <EventCard isActive={isActive} />
          <EventCard isActive={isActive} />
          <EventCard isActive={isActive} />
          <EventCard isActive={isActive} />
        </div>
      </div>
      <Footer />

    </div>
  )
}

export default Events