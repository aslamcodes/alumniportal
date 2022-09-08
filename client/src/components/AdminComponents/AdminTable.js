import React, { useEffect, useMemo, useRef, useState } from "react";
import AdminTableHeader from "./AdminTableHeader";
import AdminTablePagination from "./AdminTablePagination";
import Styles from "./AdminTable.module.css";
import AdminTableRow from "./AdminTableRow";
import { a, useSpring } from "react-spring";
import useGetAlumni from "hooks/useFetchAlumni";
import Loader from "components/UI/Loader";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import { useAuthContext } from "context/auth/authContext";
import NoDataMessage from "./NoDataMessage";
import {
  filterAlumniData,
  filterForField,
  getAlumniFilters,
} from "utils/utils";

const AlumniTable = () => {
  useEffect(() => {
    document.title = "Alumni Portal | Alumni Table";
  }, []);
  const { alumni: alumniData, error, isLoading, trigger } = useGetAlumni();
  const [alumni, setAlumni] = useState(alumniData);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableHeadOnTop, setTableHeadOnTop] = useState(false);
  const { fetchData: deleteAlumni } = useAxiosWithCallback();
  const { user } = useAuthContext();
  const totalPages = alumni ? Math.ceil(alumni.length / entriesPerPage) : 0;
  const tableHeadRef = useRef(null);
  const filters = useMemo(() => getAlumniFilters(alumniData), [alumniData]);
  const props = useSpring({
    from: {
      backgroundColor: "#e2e2e2",
    },
    to: {
      backgroundColor: tableHeadOnTop ? "#bddcf3" : "#e2e2e2",
    },
  });

  useEffect(() => {
    setAlumni(alumniData);
  }, [alumniData]);

  const onApplyFilter = (filters) => {
    setAlumni(filterAlumniData(alumniData, filters));
  };

  const onSearch = (query) => {
    setAlumni(
      alumniData.filter((alumnus) =>
        (alumnus.user.registerNumber + " " + alumnus.user.name)
          .toLowerCase()
          .includes(query)
      )
    );
  };

  const onDeleteAlumniHandler = async (userId) => {
    const deleteConfig = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      method: "delete",
      url: `/api/v1/alumni/${userId}`,
    };

    await deleteAlumni(deleteConfig, () => {
      trigger();
    });
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

  return (
    <div>
      <AdminTableHeader
        onSelect={onEntriesPerPageSelectHandler}
        onSearch={onSearch}
        type="Alumni"
        onApplyFilter={onApplyFilter}
        filters={filters}
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
              <th>Options</th>
            </div>
          </tr>
        </a.thead>
        {alumni ? (
          <tbody>
            {alumni
              ?.slice(
                currentPage * entriesPerPage - entriesPerPage,
                currentPage * entriesPerPage
              )
              .map((alumni) => (
                <AdminTableRow
                  alumni={alumni}
                  type="alumni-details"
                  onDeleteAlumni={onDeleteAlumniHandler}
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

export default AlumniTable;
