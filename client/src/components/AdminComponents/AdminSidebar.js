import React, { useState } from "react";
import Styles from "./AdminSidebar.module.css";
import {
  a,
  useChain,
  useSpring,
  useSpringRef,
  useTransition,
} from "react-spring";
import { IoHomeOutline } from "react-icons/io5";
import {
  AiOutlineUsergroupAdd,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";
import {
  MdOutlineReduceCapacity,
  MdOutlinePostAdd,
  MdOutlineEvent,
} from "react-icons/md";
import { BsCalendar4Event, BsPeople } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const expandRef = useSpringRef();
  const transitionRef = useSpringRef();

  const expandStyles = useSpring({
    ref: expandRef,
    from: {
      width: "6rem",
    },
    to: {
      width: isExpanded ? "18rem" : "6rem",
    },
  });

  const sidebarItemTransistion = useTransition(isExpanded, {
    ref: transitionRef,
    from: {
      opacity: 0,
      transform: "translateX(50%)",
    },
    enter: {
      opacity: 1,
      transform: "translateX(0)",
    },
    leave: {
      opacity: 0,
      transform: "translateX(50%)",
    },
  });

  useChain([expandRef, transitionRef], [0, isExpanded ? 0.1 : 0]);

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
        <div
          className={Styles.sidebar_item}
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={require("assets/Logo1.png")} />
        </div>
        <div
          className={Styles.sidebar_item}
          onClick={() => {
            navigate("/");
          }}
        >
          <IoHomeOutline />
          {sidebarItemTransistion((style, item) => {
            return item && <a.p style={style}>Home</a.p>;
          })}
        </div>
        {/* <div className={Styles.sidebar_item}>
          <BsCalendar4Event />
          {sidebarItemTransistion((style, item) => {
            return item && <a.p style={style}>Events</a.p>;
          })}
        </div> */}
        <div
          className={Styles.sidebar_item}
          onClick={() => {
            navigate("/admin");
          }}
        >
          <BsPeople />
          {sidebarItemTransistion((style, item) => {
            return item && <a.p style={style}>Alumni</a.p>;
          })}
        </div>
        <div
          className={Styles.sidebar_item}
          onClick={() => {
            navigate("/admin");
          }}
        >
          <BsPeople />
          {sidebarItemTransistion((style, item) => {
            return item && <a.p style={style}>Alumni</a.p>;
          })}
        </div>
        <div
          className={Styles.sidebar_item}
          onClick={() => {
            navigate("/admin/request-details");
          }}
        >
          <AiOutlineUsergroupAdd />
          {sidebarItemTransistion((style, item) => {
            return item && <a.p style={style}>New Applications</a.p>;
          })}
        </div>
        <div
          className={Styles.sidebar_item}
          onClick={() => {
            navigate("/admin/reject-details");
          }}
        >
          <AiOutlineUsergroupDelete />
          {sidebarItemTransistion((style, item) => {
            return item && <a.p style={style}>Rejected Applications</a.p>;
          })}
        </div>
        <div
          className={Styles.sidebar_item}
          onClick={() => {
            navigate("/admin/office-bearers");
          }}
        >
          <MdOutlineReduceCapacity />
          {sidebarItemTransistion((style, item) => {
            return item && <a.p style={style}>Office Bearers</a.p>;
          })}
        </div>
        <div
          className={Styles.sidebar_item}
          onClick={() => {
            navigate("/admin/post-requests");
          }}
        >
          <MdOutlinePostAdd />
          {sidebarItemTransistion((style, item) => {
            return item && <a.p style={style}>Post Requests</a.p>;
          })}
        </div>
        <div
          className={Styles.sidebar_item}
          onClick={() => {
            navigate("/admin/event-requests");
          }}
        >
          <MdOutlineEvent />
          {sidebarItemTransistion((style, item) => {
            return item && <a.p style={style}>Event Requests</a.p>;
          })}
        </div>
      </div>
    </a.div>
  );
};

export default AdminSidebar;
