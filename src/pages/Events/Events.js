import React, { useState } from "react";
import EventCard from "components/EventComponents/EventCard";
import styles from "./Events.module.css";

const Events = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={styles["event_page"]}>
      <div className={styles["event_body"]}>
        <div className={styles["event_page_content"]}>
          <div className={styles["title"]}>
            <p>
              <span>U</span>PCOMING <span>E</span>VENTS
            </p>
          </div>
          <div className={styles["events"]}>
            <div className={styles["child"]}>
              <EventCard isActive={true} />
              <EventCard isActive={isActive} />
              <EventCard isActive={isActive} />
            </div>
            <div className={styles["child"]}>
              <EventCard isActive={isActive} />
              <EventCard isActive={isActive} />
              <EventCard isActive={isActive} />
            </div>

            <div className={styles["child"]}>
              <EventCard isActive={isActive} />
              <EventCard isActive={isActive} />
              <EventCard isActive={isActive} />
            </div>
            <div className={styles["child"]}>
              <EventCard isActive={isActive} />
              <EventCard isActive={isActive} />
              <EventCard isActive={isActive} />
            </div>
            <div className={styles["child"]}>
              <EventCard isActive={isActive} />
              <EventCard isActive={isActive} />
              <EventCard isActive={isActive} />
            </div>
            <div className={styles["child"]}>
              <EventCard isActive={isActive} />
              <EventCard isActive={isActive} />
              <EventCard isActive={isActive} />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Events;
