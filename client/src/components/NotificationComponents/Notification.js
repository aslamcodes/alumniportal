import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { RiArrowDropDownLine } from 'react-icons/ri'
import styles from "./Notification.module.css"
const Notification = ({ isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleDelete = () => {
    console.log('clicked');
  }

  return (
    isActive && (
      <div className={styles.notification_container}>
        {/* Map notification_card */}
        <div className={`${styles.notification_card} ${isExpanded && styles.expanded}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={styles.message}>
            <p>Your approval has been accepted Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, saepe? Officiis tempore esse ab sint a voluptate quaerat dignissimos doloremque odit, tempora blanditiis eaque vitae atque rerum laboriosam doloribus quo.</p>
          </div>
          {isHovered && <RiArrowDropDownLine fontSize={30} className={styles.arrow_btn} onClick={() => setIsExpanded(!isExpanded)} />}
          {isHovered && <IoClose className={styles.close_btn} onClick={handleDelete} />}
        </div>
      </div>
    )
  )
}

export default Notification