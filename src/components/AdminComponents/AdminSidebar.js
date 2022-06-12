import React, { useState } from "react";
import Styles from "./AdminSidebar.module.css";
import {
  a,
  config,
  useChain,
  useSpring,
  useSpringRef,
  useTransition,
} from "react-spring";
import { IoHomeOutline } from "react-icons/io5";
import { BsCalendar4Event, BsPeople } from "react-icons/bs";

const AdminSidebar = ({ onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const expandRef = useSpringRef();
  const transitionRef = useSpringRef();
  const expandStyles = useSpring({
    ref: expandRef,
    from: {
      transform: "translateX(0)",
    },
    to: {
      transform: `translateX(${isExpanded ? "0" : "-50%"})`,
    },
  });

  const sidebarItemTransistion = useTransition(isExpanded, {
    ref: transitionRef,
    from: {
      opacity: 0,
      transform: "translateX(100%)",
    },
    enter: {
      opacity: 1,
      transform: "translateX(0)",
    },
    leave: {
      opacity: 0,
      transform: "translateX(100%)",
    },
  });

  useChain([expandRef, transitionRef]);

  return (
    <a.div style={expandStyles} className={Styles.sidebar_container}>
      <div
        onMouseEnter={() => {
          setIsExpanded(true);
        }}
        onMouseLeave={() => {
          setIsExpanded(false);
        }}
        className={Styles.sidebar}
      >
        <div className={Styles.sidebar_item}>
          <IoHomeOutline />

          {sidebarItemTransistion((style, item) => {
            return item && <a.p style={style}>Home</a.p>;
          })}
        </div>
        <div className={Styles.sidebar_item}>
          <BsCalendar4Event />
          {sidebarItemTransistion((style, item) => {
            return item && <a.p style={style}>Events</a.p>;
          })}
        </div>
        <div className={Styles.sidebar_item}>
          <BsPeople />
          {sidebarItemTransistion((style, item) => {
            return item && <a.p style={style}>Alumni</a.p>;
          })}
        </div>
      </div>
    </a.div>
  );
};

export default AdminSidebar;
