import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import React, { useEffect, useState } from "react";
import styles from "./AddEventCard.module.css";
const AddEventCard = ({ onNewItemAdd }) => {
  const today = new Date().toJSON().slice(0, 10);

  const { user } = useAuthContext();
  const { fetchData: addEvent, error: errorOnAddEvent } =
    useAxiosWithCallback();

  useEffect(() => {
    if (errorOnAddEvent)
      alert(errorOnAddEvent.response.data.message ?? errorOnAddEvent);
  }, [errorOnAddEvent]);

  const [eventData, setEventData] = useState({
    title: "",
    date: [today],
    startTime: "11:00",
    endTime: "14:00",
    location: "",
  });

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventConfig = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      url: "/api/v1/events/",
      method: "post",
    };

    await addEvent({
      ...eventConfig,
      data: {
        eventName: eventData.title,

        startDate: new Date(
          `${eventData.date}T${eventData.startTime}:00.000Z`
        ).toISOString(),

        endDate: new Date(
          `${eventData.date}T${eventData.endTime}:00.000Z`
        ).toISOString(),

        venue: eventData.location,

        isApproved: user?.isAlumni || user?.isAdmin,
      },
    });

    setEventData({
      title: "",
      date: [today],
      startTime: "11:00",
      endTime: "14:00",
      location: "",
    });

    onNewItemAdd((prev) => !prev);

    alert(
      user?.isAlumni || user?.isAdmin
        ? "Event Created Successfully"
        : "Event details has sent to admin for verification, You will be notified shortly"
    );
  };

  return (
    <div className={styles.add_event_card} onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label htmlFor="eventName">Title</label>
          <input
            type="text"
            name="title"
            id="eventName"
            placeholder="Event Name"
            value={eventData.title}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="eventDate">Date</label>
          <input
            type="date"
            name="date"
            id="eventDate"
            value={eventData.date}
            onChange={handleChange}
            max="3000-12-31"
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="eventTime">Time</label>
          <div className={styles.split_container}>
            <div className={styles.input_container}>
              <input
                type="time"
                name="startTime"
                id="eventStart"
                value={eventData.startTime}
                onChange={handleChange}
              />
            </div>
            <p>To</p>
            <div className={styles.input_container}>
              <input
                type="time"
                name="endTime"
                id="eventEnd"
                value={eventData.endTime}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.input_container}>
          <label htmlFor="eventLocation">Location</label>
          <input
            type="text"
            name="location"
            id="eventLocation"
            placeholder="venue"
            value={eventData.location}
            onChange={handleChange}
          />
        </div>
        <div className={styles.add_event_button}>
          <button type="submit" className={styles.submit_button}>
            Add Event
            <img src={require("assets/icons/send.png")} alt="send icon" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEventCard;
