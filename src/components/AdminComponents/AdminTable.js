import Pagination from "components/UI/Pagination";
import React, { useState } from "react";
import AdminTableHeader from "./AdminTableHeader";
import AdminTablePagination from "./AdminTablePagination";

const AdminTable = () => {
  return (
    <div>
      <AdminTableHeader />
      <AdminTablePagination />
    </div>
  );
};

export default AdminTable;
