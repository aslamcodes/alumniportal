import React, { useEffect, useRef, useState } from "react";
import AdminTableHeader from "./AdminTableHeader";
import AdminTablePagination from "./AdminTablePagination";
import Styles from "./AdminTable.module.css";
import AdminTableRow from "./AdminTableRow";
import { a, useSpring } from "react-spring";

const AdminTable = () => {
  const data = [...Array.from(Array(1000).keys())];
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableHeadOnTop, setTableHeadOnTop] = useState(false);
  const totalPages = Math.ceil(data.length / entriesPerPage);
  const tableHeadRef = useRef(null);

  const props = useSpring({
    from: {
      backgroundColor: "#e2e2e28e",
    },
    to: {
      backgroundColor: tableHeadOnTop ? "#bddcf380" : "#e2e2e28e",
    },
  });

  const OnIncreaseHandler = () => {
    if (currentPage > totalPages - 1) return null;
    setCurrentPage(currentPage + 1);
  };

  const onDecreaseHandler = () => {
    if (currentPage < 2) return null;
    setCurrentPage(currentPage - 1);
  };

  const onEntriesPerPageSelectHandler = (value) => {
    setEntriesPerPage(value);
  };

  return (
    <div>
      <AdminTableHeader onSelect={onEntriesPerPageSelectHandler} />
      <div className={Styles.table_container}>
        <table className={Styles.table}>
          <a.thead style={props} ref={tableHeadRef}>
            <tr className={Styles.table_row}>
              <th>Regno</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Organization</th>
              <th>Contact</th>
              <th>Email</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Graduation</th>
              <th>PG College name</th>
              <th>Course Name</th>
              <th>Skills/Domain</th>
              <th >Actions</th>
            </tr>
          </a.thead>
          <tbody>
            {data
              .slice(
                currentPage * entriesPerPage - entriesPerPage,
                currentPage * entriesPerPage
              )
              .map((roll) => (
                <AdminTableRow roll={roll + 1} />
              ))}
          </tbody>
        </table>
      </div>
      <AdminTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onIncrease={OnIncreaseHandler}
        onDecrease={onDecreaseHandler}
      />
    </div>
  );
};

export default AdminTable;
