import React from "react";
import AdminTableHeader from "./AdminTableHeader";
import styles from "./OfficeBearerTable.module.css";
import OfficeBearerTableRow from "./OfficeBearerTableRow";

const OfficeBearerTable = () => {
  return (
    <div className={styles.office_bearer_container}>
      <AdminTableHeader
        type="Office Bearers"
      />

      <table id={styles.office_bearer_table}>
        <thead>
          <tr>
            <th>Regno</th>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Organization</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <OfficeBearerTableRow />
        </tbody>
      </table>
    </div>
  )
};

export default OfficeBearerTable;
