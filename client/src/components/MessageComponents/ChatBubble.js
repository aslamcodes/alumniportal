import React, { useState } from "react";
import styles from "./ChatBubble.module.css";

function ChatBubble({ type, message }) {
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  return (
    <div
      className={`${styles.chat_bubble} ${type === 0 && styles.recieve} ${
        type === 1 && styles.sender
      }`}
      onContextMenu={() => setIsDeleteActive(true)}
    >
      {message}
      {isDeleteActive && <button className={styles.delete_btn}>delete</button>}
    </div>
  );
}

export default ChatBubble;
