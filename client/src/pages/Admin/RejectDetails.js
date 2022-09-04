import React, { useEffect } from "react";
import Styles from "./Admin.module.css";
import AdminSidebar from "components/AdminComponents/AdminSidebar";
import RejectTable from "components/AdminComponents/RejectTable";

const RejectDetails = () => {
  useEffect(() => {
    document.title="Alumni Portal | Rejected Applications"
  });
  return (
    <div className={Styles.admin_container}>
      <AdminSidebar />
      <main className={Styles.main}>
        <RejectTable />
      </main>
    </div>
  );
};

export default RejectDetails;
