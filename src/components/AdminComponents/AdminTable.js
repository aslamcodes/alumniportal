import React from "react";
import AdminTableHeader from "./AdminTableHeader";
import AdminTablePagination from "./AdminTablePagination";
import Styles from "./AdminTable.module.css";
import AdminTableRow from "./AdminTableRow";
const AdminTable = () => {
  return (
    <div>
      <AdminTableHeader />
      <table className={Styles.table}>
        <thead>
          <tr className={Styles.table_row}>
            <th>Regno</th>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Organization</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10).keys()].map((_) => (
            <AdminTableRow />
          ))}
        </tbody>
      </table>
      <AdminTablePagination />
    </div>
  );
};

export default AdminTable;
