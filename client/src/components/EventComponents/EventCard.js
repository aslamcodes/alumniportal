import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import React from "react";
import styles from "./EventCard.module.css";

const EventCard = ({ isActive, isCardActive, event, isAdmin, trigger }) => {
  const { fetchData, error, isLoading } = useAxiosWithCallback();
  const { user } = useAuthContext();
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

  const handleDeleteEvent = async (e) => {
    e.preventDefault();
    console.log(user?.token);
    const deleteConfig = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      url: `/api/v1/events/${event?._id}`,
      method: "delete",
    };
    await fetchData(deleteConfig, (res) => {
      console.log(res);
    });
    trigger((prev) => !prev);
  };

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
          {eventEndDate.getUTCHours()}:{eventEndDate.getUTCMinutes()}
        </p>
        <p>{event.venue}</p>
      </div>
      {isAdmin && (
        <div className={`${styles.event_edit}`} onClick={handleDeleteEvent}>
          <img src={require("assets/icons/block.png")} alt="edit icon" />
        </div>
      )}
    </div>
  );
};

export default EventCard;
