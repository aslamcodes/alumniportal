import Loader from "components/UI/Loader";
import useFetchNotification from "hooks/useFetchNotification";
import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import styles from "./NotificationPanel.module.css";

const NotificationPanel = () => {
  const { isLoading, error, notifications, trigger } = useFetchNotification();
  const [notificationsOnState, setNotificationOnState] =
    useState(notifications);

  useEffect(() => {
    setNotificationOnState(notifications);
  }, [notifications]);

  const onResolveHandler = (notificationId) => {
    setNotificationOnState((prev) =>
      prev.filter((notification) => notification._id === notificationId)
    );
    trigger();
  };

  return (
    <div className={styles.notification_container}>
      <NotificationCard notification={{ message: "Notifications" }}
        type={1}
      // type 0 is for no notification
      />
      {isLoading ? (
        <Loader />
      ) : notificationsOnState?.length === 0 ? (
        <NotificationCard notification={{ message: "No new notification " }}
          type={0}
        // type 0 is for no notification
        />
      ) : (
        notificationsOnState.map((notification) => (
          <NotificationCard
            // type="approval" is for alumni reject notification
            onResolve={onResolveHandler}
            notification={notification}
          />
        ))
      )}
    </div>
  );
};

export default NotificationPanel;
