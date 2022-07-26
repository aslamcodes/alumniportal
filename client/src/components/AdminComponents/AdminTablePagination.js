import Pagination from "components/UI/Pagination";
import React, { useState } from "react";
import Styles from "./AdminTablePagination.module.css";
const AdminTablePagination = (props) => {
  return (
    <div className={Styles.admin_table_pagination}>
      <Pagination {...props} />
    </div>
  );
};

export default AdminTablePagination;
