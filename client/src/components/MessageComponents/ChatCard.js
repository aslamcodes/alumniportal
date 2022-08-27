import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import styles from "./ChatCard.module.css"
const ChatCard = () => {
  return (
    <div className={styles.chatCard_container}>
      <div className={styles.chatCard_profile}>
        <img src={require("assets/christopher.jpg")} alt="" />
      </div>
      <div className={styles.chatCard_body}>
        <div className={styles.chatCard_details}>
          <div>
            <h3>
              Jennifer
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti non velit mollitia, nostrum earum dolorem ut et, sequi ullam quisquam voluptatibus exercitationem blanditiis ipsam corporis quis, doloribus accusantium alias nemo! */}
            </p>
          </div>
          <IoIosArrowForward className={styles.arrow_forward_btn} fontSize={20} />
        </div>
        <hr />
      </div>
    </div>
  )
}

export default ChatCard