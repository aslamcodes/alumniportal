import Loader from "components/UI/Loader";
import useFetchNotification from "hooks/useFetchNotification";
import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import styles from "./NotificationPanel.module.css";

const NotificationPanel = ({ onResolve }) => {
  const { isLoading, error, notifications } = useFetchNotification();
  const [notificationsOnState, setNotificationOnState] =
    useState(notifications);

  useEffect(() => {
    setNotificationOnState(notifications);
  }, [notifications]);

  const onResolveHandler = (notificationId) => {
    setNotificationOnState((prev) =>
      prev.filter((notification) => notification._id === notificationId)
    );
  };

  return (
    <div className={styles.notification_container}>
      {isLoading ? (
        <Loader />
      ) : notificationsOnState?.length === 0 ? (
        <p>No New Notifications</p>
      ) : (
        notificationsOnState.map((notification) => (
          <NotificationCard
            onResolve={onResolveHandler}
            notification={notification}
          />
        ))
      )}
    </div>
  );
};

export default NotificationPanel;
