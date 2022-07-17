import React, { useState } from "react";
import EventCard from "components/EventComponents/EventCard";
import AddEventCard from "components/EventComponents/AddEventCard";
import styles from "./Events.module.css";

const Events = () => {
  const [isActive, setIsActive] = useState(false);
  const [isCardActive, setIsCardActive] = useState(false);
  return (
    <div className={styles["event_page"]}>
      <div className={styles["event_body"]}>
        <div className={styles["event_page_content"]}>
          <div className={styles["header"]}>
            <h2>
              <span>U</span>PCOMING <span>E</span>VENTS
            </h2>
            <div className={`${styles["add_event_button"]} ${isCardActive && styles["active"]}`} onClick={() => setIsCardActive(!isCardActive)}>
              <p>Edit</p>
            </div>
            {isCardActive && <AddEventCard />}
          </div>
          <div className={styles["events"]}>
            <div className={styles["child"]}>
              <EventCard isActive={true} isCardActive={isCardActive} />
              <EventCard isActive={isActive} isCardActive={isCardActive} />
              <EventCard isActive={isActive} isCardActive={isCardActive} />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Events;
