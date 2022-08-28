import React from 'react'
import styles from './ChatBubble.module.css'
function ChatBubble({ type }) {
  return (
    <div className={`${styles.chat_bubble} ${type === 0 && styles.recieve} ${type === 1 && styles.sender}`}>
      hello lorem
    </div>
  )
}

export default ChatBubble