import React, { useState } from "react";
import EventCard from "components/EventComponents/EventCard";
import AddEventCard from "components/EventComponents/AddEventCard";
import styles from "./Events.module.css";
import useGetEvents from "hooks/useGetEvents";
import Loader from "components/UI/Loader";
import { useAuthContext } from "context/auth/authContext";

const Events = () => {
  const [isActive, setIsActive] = useState(false);
  const [isCardActive, setIsCardActive] = useState(false);
  const { isLoading, events, error } = useGetEvents();
  const { user } = useAuthContext();

  return (
    <div className={styles["event_page"]}>
      <div className={styles["event_body"]}>
        <div className={styles["event_page_content"]}>
          <div className={styles["header"]}>
            <h2>
              <span>U</span>PCOMING <span>E</span>VENTS
            </h2>
            {user?.isAdmin && (
              <div
                className={`${styles["add_event_button"]} ${
                  isCardActive && styles["active"]
                }`}
                onClick={() => setIsCardActive(!isCardActive)}
              />
            )}
            {isCardActive && <AddEventCard />}
          </div>
          <div className={styles["events"]}>
            {isLoading ? (
              <Loader />
            ) : (
              <div className={styles["child"]}>
                {events.map((event) => (
                  <EventCard
                    isAdmin={user?.isAdmin}
                    isActive={true}
                    isCardActive={isCardActive}
                    event={event}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
