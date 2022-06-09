import React, { useState } from "react";
import Styles from "./AdminSidebar.module.css";
import { a, useSpring } from "react-spring";
import { IoHomeOutline } from "react-icons/io5";
import { BsCalendar4Event, BsPeople } from "react-icons/bs";
const AdminSidebar = ({ onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandStyles = useSpring({
    width: isExpanded ? "30%" : "10%",
  });

  return (
    <a.div style={expandStyles}>
      <div
        onMouseEnter={() => {
          setIsExpanded(true);
        }}
        onMouseLeave={() => {
          setIsExpanded(false);
        }}
        className={Styles.container}
      >
        <IoHomeOutline />
        <BsCalendar4Event />
        <BsPeople />
      </div>
    </a.div>
  );
};

export default AdminSidebar;
