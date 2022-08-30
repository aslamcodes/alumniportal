import Loader from "components/UI/Loader";
import useFetchNotification from "hooks/useFetchNotification";
import React from "react";
import NotificationCard from "./NotificationCard";
import styles from "./NotificationPanel.module.css";

const NotificationPanel = () => {
  const { isLoading, error, notifications } = useFetchNotification();

  return (
    <div className={styles.notification_container}>
      {isLoading ? (
        <Loader />
      ) : (
        notifications.map((notification) => (
          <NotificationCard notification={notification} />
        ))
      )}
    </div>
  );
};

export default NotificationPanel;
