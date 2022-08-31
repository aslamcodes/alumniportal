import { userEvent } from "@storybook/testing-library";
import Loader from "components/UI/Loader";
import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import styles from "./NotificationCard.module.css";

const NotificationCard = ({ notification, onResolve, type }) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [isContact, setIsContact] = useState(false);
  const { isLoading, error, fetchData } = useAxiosWithCallback();
  const { user } = useAuthContext();
  const messageElement = useRef(null);
  const hasOverflowingChildren = messageElement.clientWidth < messageElement.scrollWidth;
  console.log(hasOverflowingChildren);
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
    >
      <div className={styles.message} >
        <p ref={messageElement} >{notification.message}</p>
        {type === "approval" && (
          !isContact ?
            <div className={styles.actions}>
              <button className={styles.accept}>Accept</button>
              <button className={styles.contact} onClick={() => setIsContact(true)}>Contact</button>
            </div>
            :
            <button className={styles.admin_contact}>admin_1@skct.gmail.com</button>
        )
        }

      </div>
      {type !== 0 &&
        <>
          <RiArrowDropDownLine
            fontSize={30}
            className={styles.arrow_btn}
            onClick={() => setIsExpanded(!isExpanded)}
          />


          <IoClose className={styles.close_btn} onClick={handleDelete} font-size={20} />
        </>
      }

    </div>
  );
};

export default NotificationCard;
