import React, { useEffect, useRef, useState } from 'react'
import styles from "./Messages.module.css"
import { RiArrowDropDownLine } from 'react-icons/ri'
import ChatCard from './ChatCard'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoIosArrowBack, IoIosSend } from 'react-icons/io'
import ChatBubble from './ChatBubble.js'

const ChatSelectPage = ({ isMessagesActive, setIsMessagesActive, setIsChatSelected }) => {
  return (
    <>
      <div className={styles.messages_header}>
        Messages
        <div className={styles.messages_actions}>
          <AiOutlinePlus className={styles.add_btn} fontSize={20} />
          <RiArrowDropDownLine className={styles.arrow_btn} fontSize={35} onClick={() => setIsMessagesActive(!isMessagesActive)} />
        </div>
      </div>

      <>
        <hr className={styles.hr_header} />
        <div className={`${styles.chat_container} ${isMessagesActive && styles.active}`}>
          <ChatCard setIsActive={setIsChatSelected} />
          <ChatCard setIsActive={setIsChatSelected} />
          <ChatCard setIsActive={setIsChatSelected} />
          <ChatCard setIsActive={setIsChatSelected} />
          <ChatCard setIsActive={setIsChatSelected} />
          <ChatCard setIsActive={setIsChatSelected} />
          <ChatCard setIsActive={setIsChatSelected} />
          <ChatCard setIsActive={setIsChatSelected} />
          <ChatCard setIsActive={setIsChatSelected} />
          <ChatCard setIsActive={setIsChatSelected} />
        </div>
      </>
    </>

  )
}

const ChatPage = ({ user, isMessagesActive, setIsMessagesActive, setIsChatSelected }) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
    scrollToBottom()
  }, []);

  return (
    <>
      <div className={styles.messages_header}>
        <div className={styles.chat_profile}>
          <div>
            <IoIosArrowBack className={styles.back_btn} fontSize={20} onClick={() => setIsChatSelected(false)} />
          </div>
          <img src={require("assets/christopher.jpg")} alt="" />
          <div>
            {user}
          </div>
        </div>
        <div className={styles.messages_actions}>
          <RiArrowDropDownLine className={styles.arrow_btn} fontSize={35} onClick={() => setIsMessagesActive(!isMessagesActive)} />
        </div>
      </div>

      <>
        <hr className={styles.hr_header} />
        <div className={`${styles.chat_container} ${styles.chat} ${isMessagesActive && styles.active}`}>
          {/* type 0 recieved message and type 1 message sent*/}
          <ChatBubble type={0} />
          <ChatBubble type={1} />
          <ChatBubble type={0} />
          <ChatBubble type={0} />
          <ChatBubble type={1} />
          <ChatBubble type={1} />
          <ChatBubble type={0} />
          <ChatBubble type={1} />
          <ChatBubble type={0} />
          <ChatBubble type={1} />
          <ChatBubble type={1} />
          <ChatBubble type={0} />
          <ChatBubble type={1} />
          <ChatBubble type={0} />
          <ChatBubble type={0} />
          <ChatBubble type={1} />
          <div ref={messagesEndRef} />
          <div className={styles.input_container}>
            <span class={styles.textarea} role="textbox" contentEditable={true} suppressContentEditableWarning={true}
              onBlur={(e) => setMessage(e.currentTarget.textContent)}
            >{message}</span>
            <IoIosSend font-size={30} className={styles.send_btn} />
          </div>
        </div>
      </>
    </>

  )
}


const Messages = () => {
  const [isChatSelected, setIsChatSelected] = useState(false);
  const [isMessagesActive, setIsMessagesActive] = useState(false);

  return (
    <div className={`${styles.messages_container} ${isMessagesActive && styles.active}`} >
      {!isChatSelected ?
        <ChatSelectPage
          isMessagesActive={isMessagesActive} setIsMessagesActive={setIsMessagesActive}
          setIsChatSelected={setIsChatSelected}
        />
        :
        <ChatPage
          user="Jennifer"
          isMessagesActive={isMessagesActive} setIsMessagesActive={setIsMessagesActive}
          setIsChatSelected={setIsChatSelected}
        />
      }
    </div>
  )
}

export default Messages