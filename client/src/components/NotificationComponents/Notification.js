import React from 'react'
import { IoClose } from 'react-icons/io5'
import { RiArrowDropDownLine } from 'react-icons/ri'
import styles from "./Notification.module.css"
const Notification = () => {

  return (
    <div className={styles.notification_container}>
      <div className={`${styles.notification_card} ${styles.expanded}`}>
        <div className={styles.message}>
          <p>Your approval has been accepted Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, saepe? Officiis tempore esse ab sint a voluptate quaerat dignissimos doloremque odit, tempora blanditiis eaque vitae atque rerum laboriosam doloribus quo.</p>
        </div>
        <RiArrowDropDownLine fontSize={30} className={styles.arrow_btn} />
        <IoClose className={styles.close_btn} />
      </div>
    </div>
  )
}

export default Notification