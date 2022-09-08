import Loader from "components/UI/Loader";
import { useAlertContext } from "context/alert/alertContext";
import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import React, { useEffect } from "react";
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
  const { successAlert, errorAlert } = useAlertContext();

  useEffect(() => {
    if (error) errorAlert(error);
  }, [error, errorAlert]);

  const handleDeleteEvent = async (e) => {
    e.preventDefault();

    const deleteConfig = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      url: `/api/v1/events/${event?._id}`,
      method: "delete",
    };

    await fetchData(deleteConfig, (res) => {
      successAlert(`Deleted event ${res.eventName}`);
    });

    trigger((prev) => !prev);
  };

  if (isLoading) return <Loader />;

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
          {eventStartDate.getUTCHours()}:{(eventStartDate.getUTCMinutes() < 10 && "0") + eventStartDate.getUTCMinutes()} -{" "}
          {eventEndDate.getUTCHours()}:{(eventEndDate.getUTCMinutes() < 10 && "0") + eventEndDate.getUTCMinutes()}
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
