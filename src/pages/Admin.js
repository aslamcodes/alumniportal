import React from "react";
import AdminSidebar from "components/UI/AdminSidebar";
import Pagination from "components/UI/Pagination";
import Styles from "./Admin.module.css";

const Admin = () => {
  return (
    <div className={Styles.admin_container}>
      <AdminSidebar />
      <Pagination />
    </div>
  );
};

export default Admin;
