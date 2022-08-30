import { userEvent } from "@storybook/testing-library";
import Loader from "components/UI/Loader";
import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import styles from "./NotificationCard.module.css";

const NotificationCard = ({ notification, onResolve }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { isLoading, error, fetchData } = useAxiosWithCallback();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    const config = {
      url: "/api/v1/users/notifications/resolve/" + notification._id,
      method: "patch",
      headers: {
        Authorization: "Bearer " + user?.token,
      },
    };
    user && (await fetchData(config));

    onResolve();
  };

  if (isLoading) return <Loader />;

  return (
    <div
      className={`${styles.notification_card} ${isExpanded && styles.expanded}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.message}>
        <p>{notification.message}</p>
      </div>
      {isHovered && (
        <RiArrowDropDownLine
          fontSize={30}
          className={styles.arrow_btn}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      )}
      {isHovered && (
        <IoClose className={styles.close_btn} onClick={handleDelete} />
      )}
    </div>
  );
};

export default NotificationCard;
