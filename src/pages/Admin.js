import React from "react";
import AdminSidebar from "../components/UI/AdminSidebar";
import PageChanger from "../components/UI/PageChanger";
import Styles from "./Admin.module.css";

const Admin = () => {
  return (
    <div className={Styles.admin_container}>
      <AdminSidebar />
      <PageChanger />
    </div>
  );
};

export default Admin;
