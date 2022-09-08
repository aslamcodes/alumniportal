import React, { useEffect, useMemo, useRef, useState } from "react";
import AdminTableHeader from "./AdminTableHeader";
import AdminTablePagination from "./AdminTablePagination";
import Styles from "./AdminTable.module.css";
import AdminTableRow from "./AdminTableRow";
import { a, useSpring } from "react-spring";
import useGetRejectedApplications from "hooks/useGetRejectedAlumniApplications";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import { useAuthContext } from "context/auth/authContext";
import NoDataMessage from "./NoDataMessage";
import { filterAlumniData, getAlumniFilters } from "utils/utils";

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
  const [filteredApplications, setFilteredApplications] = useState([]);
  const props = useSpring({
    from: {
      backgroundColor: "#e2e2e2",
    },
    to: {
      backgroundColor: tableHeadOnTop ? "#bddcf3" : "#e2e2e2",
    },
  });

  useEffect(() => {
    setFilteredApplications(rejectedApplications);
  }, [rejectedApplications]);

  const filters = useMemo(
    () => getAlumniFilters(rejectedApplications),
    [rejectedApplications]
  );
  const onApplyFilter = (filters) => {
    setFilteredApplications(filterAlumniData(rejectedApplications, filters));
  };

  const onSearch = (query) => {
    setFilteredApplications(
      filteredApplications.filter((alumnus) =>
        (alumnus.user.registerNumber + " " + alumnus.user.name)
          .toLowerCase()
          .includes(query)
      )
    );
  };

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
  const dataHeaders = [
    { label: 'Register Number', key: 'user.registerNumber' },
    { label: 'Name', key: 'user.name' },
    { label: 'Department', key: 'user.department' },
    { label: 'Designation', key: 'alumni_data.designation' },
    { label: 'Company', key: 'alumni_data.companyName' },
    { label: 'Phone Number', key: 'user.phoneNumber' },
    { label: 'Email', key: 'user.email' },
    { label: 'City', key: 'user.city' },
    { label: 'State', key: 'user.state' },
    { label: 'Country', key: 'user.country' },
    { label: 'Graduation Level', key: 'user.graduationLevel' },
    { label: 'PG College Name', key: 'secondaryCollegeName' },
    { label: 'Course Name', key: 'courseName' },
    { label: 'Skills', key: 'user.skill' }
  ];

  return (
    <div>
      <AdminTableHeader
        data={rejectedApplications}
        headers={dataHeaders}
        filename="Rejected Applications"
        onSelect={onEntriesPerPageSelectHandler}
        type="Rejected Applications"
        filters={filters}
        onApplyFilter={onApplyFilter}
        onSearch={onSearch}
      />

      <table className={Styles.table}>
        <a.thead style={props} ref={tableHeadRef}>
          <tr className={Styles.table_row}>
            <th>Regno</th>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Company</th>
            <th>Contact</th>
            <th>Email</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Graduation</th>
            <th>PG College Name</th>
            <th>Course Name</th>
            <th>Skills/Domain</th>
            <div className={Styles.fixed_col}>
              <th>Actions</th>
            </div>
          </tr>
        </a.thead>
        {filteredApplications && filteredApplications.length > 0 ? (
          <tbody>
            {filteredApplications
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
        ) : (
          <NoDataMessage />
        )}
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
