import React, { useEffect, useRef, useState } from "react";
import AdminTableHeader from "./AdminTableHeader";
import AdminTablePagination from "./AdminTablePagination";
import Styles from "./AdminTable.module.css";
import AdminTableRow from "./AdminTableRow";
import { a, useSpring } from "react-spring";
import useGetRejectedApplications from "hooks/useGetRejectedAlumniApplications";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import { useAuthContext } from "context/auth/authContext";
const RejectTable = () => {
  const data = [...Array.from(Array(1000).keys())];
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableHeadOnTop, setTableHeadOnTop] = useState(false);
  const totalPages = Math.ceil(data.length / entriesPerPage);
  const tableHeadRef = useRef(null);
  const [loading, setIsLoading] = useState(false);
  const { rejectedApplications, error, isLoading } =
    useGetRejectedApplications();
  const { user } = useAuthContext();
  const { fetchData: reapproveAlumni } = useAxiosWithCallback();

  const props = useSpring({
    from: {
      backgroundColor: "#e2e2e2",
    },
    to: {
      backgroundColor: tableHeadOnTop ? "#bddcf3" : "#e2e2e2",
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

  const adminConfig = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const onReapproveAlumni = async (alumni) => {
    setIsLoading(true);
    await reapproveAlumni({
      ...adminConfig,
      method: "patch",
      url: `/api/v1/alumni/approve/${alumni}`,
    });
    setIsLoading(false);
  };

  return (
    <div>
      <AdminTableHeader
        onSelect={onEntriesPerPageSelectHandler}
        type="Rejected Applications"
      />

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

            <div className={Styles.fixed_col}>
              <th>Actions</th>
            </div>
          </tr>
        </a.thead>
        <tbody>
          {rejectedApplications
            .slice(
              currentPage * entriesPerPage - entriesPerPage,
              currentPage * entriesPerPage
            )
            .map((application) => (
              <AdminTableRow
                alumni={application}
                type="reject-details"
                reapproveAlumni={onReapproveAlumni}
              />
            ))}
        </tbody>
      </table>

      <AdminTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onIncrease={OnIncreaseHandler}
        onDecrease={onDecreaseHandler}
      />
    </div>
  );
};

export default RejectTable;
