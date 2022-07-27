import React from "react";
import Styles from "./Admin.module.css";
import AdminSidebar from "components/AdminComponents/AdminSidebar";
import AdminTable from "components/AdminComponents/AdminTable";

const Admin = () => {
  return (
    <div className={Styles.admin_container}>
      <AdminSidebar />
      <main className={Styles.main}>

        <AdminTable />

      </main>
    </div>
  );
};

export default Admin;
