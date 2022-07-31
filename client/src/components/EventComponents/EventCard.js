import React from "react";
import styles from "./EventCard.module.css";
const EventCard = ({ isActive, isCardActive, event, isAdmin }) => {
  const eventStartDate = new Date(event.startDate || event.date);
  const eventEndDate = new Date(event.endDate || event.date);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <div className={`${styles.event_card} ${isActive && styles.active} `}>
      <div className={styles["date"]}>
        <p>{eventStartDate.getDate()}</p>
        <p>{monthNames[eventStartDate.getMonth()]}</p>
      </div>
      <div className={styles["title"]}>
        <p>{event.eventName}</p>
      </div>
      <div className={styles["venue"]}>
        <p>
          {eventStartDate.getUTCHours()}:{eventStartDate.getUTCMinutes()} -{" "}
          {eventEndDate.getUTCHours()}: {eventEndDate.getUTCMinutes()}
        </p>
        <p>{event.venue}</p>
      </div>
      {isAdmin && (
        <div className={`${styles.event_edit}`}>
          <img src={require("assets/icons/block.png")} alt="edit icon" />
        </div>
      )}
    </div>
  );
};

export default EventCard;
