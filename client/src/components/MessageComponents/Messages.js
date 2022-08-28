import React, { useState } from 'react'
import styles from "./Messages.module.css"
import { IoClose } from 'react-icons/io5'
import { RiArrowDropDownLine } from 'react-icons/ri'
import ChatCard from './ChatCard'
const Messages = () => {

  const [isMessagesActive, setIsMessagesActive] = useState(false);

  return (
    <div className={`${styles.messages_container} ${isMessagesActive && styles.active}`}>
      <div className={styles.messages_header}>
        Messages
        <div className={styles.messages_actions}>
          <RiArrowDropDownLine className={styles.arrow_btn} fontSize={35} onClick={() => setIsMessagesActive(!isMessagesActive)} />
          <IoClose className={styles.close_btn} fontSize={20} />
        </div>
      </div>

      <>
        <hr className={styles.hr_header} />
        <div className={`${styles.chat_container} ${isMessagesActive && styles.active}`}>
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
        </div>
      </>
    </div>
  )
}

export default Messages