import React, { useEffect }from "react";
import Styles from "./Admin.module.css";
import AdminSidebar from "components/AdminComponents/AdminSidebar";
import RequestTable from "components/AdminComponents/RequestTable";

const RequestDetails = () => {
  useEffect(() => {
    document.title="Alumni Portal | New Alumni Request"
  });
  return (
    <div className={Styles.admin_container}>
      <AdminSidebar />
      <main className={Styles.main}>
        <RequestTable />
      </main>
    </div>
  );
};

export default RequestDetails;
