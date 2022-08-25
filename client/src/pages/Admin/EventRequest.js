import AdminSidebar from "components/AdminComponents/AdminSidebar";
import EventRequestPanel from "components/AdminComponents/EventRequestPanel";
import React from "react";
import Styles from "./Admin.module.css";

const EventRequest = () => {
  return (
    <div className={Styles.admin_container}>
      <AdminSidebar />
      <main className={Styles.main}>
        <EventRequestPanel />
      </main>
    </div>
  );
};

export default EventRequest;
