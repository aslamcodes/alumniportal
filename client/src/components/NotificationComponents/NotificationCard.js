import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import styles from "./NotificationCard.module.css";

const NotificationCard = ({ notification }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = () => {
    console.log("clicked");
  };
  return (
    <div
      className={`${styles.notification_card} ${isExpanded && styles.expanded}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.message}>
        <p>{notification.message}</p>
      </div>
      {isHovered && (
        <RiArrowDropDownLine
          fontSize={30}
          className={styles.arrow_btn}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      )}
      {isHovered && (
        <IoClose className={styles.close_btn} onClick={handleDelete} />
      )}
    </div>
  );
};

export default NotificationCard;
