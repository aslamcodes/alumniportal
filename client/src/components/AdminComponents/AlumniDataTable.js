import React, { useEffect, useMemo, useRef, useState } from "react";
import AdminTableHeader from "./AdminTableHeader";
import AdminTablePagination from "./AdminTablePagination";
import Styles from "./AdminTable.module.css";
import AdminTableRow from "./AdminTableRow";
import { a, useSpring } from "react-spring";

import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import { useAuthContext } from "context/auth/authContext";
import NoDataMessage from "./NoDataMessage";
import { useAlertContext } from "context/alert/alertContext";
import {
  filterAlumniData,
  filterForField,
  getAlumniFilters,
} from "utils/utils";

import useGetAlumniStoredData from "hooks/useGetAlumniStoredData";
import AdminDataTableRow from "./AlumniDataTableRow";
import useCountAlumniData from "hooks/useCountAlumniData";
import useGetAlumniData from "hooks/useGetAlumniData";
import Loader from "components/UI/Loader";

const AlumniDataTable = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableHeadOnTop, setTableHeadOnTop] = useState(false);

  const { count } = useCountAlumniData();
  const uptoIndex = currentPage * entriesPerPage;
  const { alumniData, error, isLoading } = useGetAlumniData(
    uptoIndex,
    entriesPerPage
  );

  const [alumni, setAlumni] = useState(alumniData);

  const { fetchData: deleteAlumni } = useAxiosWithCallback();

  const { user } = useAuthContext();
  const { errorAlert } = useAlertContext();

  const totalPages = alumni ? Math.ceil(count / entriesPerPage) : 0;
  const tableHeadRef = useRef(null);
  // const filters = useMemo(() => getAlumniFilters(alumniData), [alumniData]);
  const props = useSpring({
    from: {
      backgroundColor: "#e2e2e2",
    },
    to: {
      backgroundColor: tableHeadOnTop ? "#bddcf3" : "#e2e2e2",
    },
  });

  useEffect(() => {
    document.title = "Alumni Portal | Alumni Table";
    if (error) {
      return errorAlert("404 Error, Can't fetch data");
    }
  }, [errorAlert]);

  useEffect(() => {
    setAlumni(alumniData);
  }, [alumniData]);


  const onSearch = (query) => {
    setAlumni(
      alumniData.filter((alumnus) => {
        return Object.keys(alumnus)
          .reduce((accStr, field) => accStr + " " + alumnus[field])
          .toLowerCase()
          .includes(query);
      })
    );
  };

  // const onDeleteAlumniHandler = async (userId) => {
  //   const deleteConfig = {
  //     headers: {
  //       Authorization: `Bearer ${user?.token}`,
  //     },
  //     method: "delete",
  //     url: `/api/v1/alumni/${userId}`,
  //   };

  //   await deleteAlumni(deleteConfig, () => {
  //     trigger();
  //   });
  // };

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
    setCurrentPage(1);
  };

  if (isLoading) {
    return <Loader />;
  }

  const dataHeaders = [
    { label: 'Register Number', key: 'alumni?.registerNumber' },
    { label: 'Name', key: 'alumni.name' },
    { label: 'Address', key: 'alumni.address' },
    { label: 'Batch', key: 'alumni.batch' },
    { label: 'Company', key: 'alumni.company' },
    { label: 'Company Address', key: 'alumni.companyAddress' },
    { label: 'Contact', key: 'alumni.contact' },
    { label: 'DOB', key: 'alumni.dateOfBirth' },
    { label: 'Designation', key: 'alumni.designation' },
    { label: 'Email', key: 'alumni.email' },
    { label: 'Nature of work', key: 'alumni.natureOfWork' },
  ];

  return (
    <div>
      <AdminTableHeader
        onSearch={onSearch}
        data={alumni}
        headers={dataHeaders}
        filename="Alumni Details"
        entriesPerPage={entriesPerPage}
        onEntriesSelect={onEntriesPerPageSelectHandler}
        type="Alumni Data"
      />

      <table className={Styles.table}>
        <a.thead style={props} ref={tableHeadRef}>
          <tr className={Styles.table_row}>
            <th>Regno</th>
            <th>Name</th>
            <th>Address</th>
            <th>Batch</th>
            <th>Company</th>
            <th>Company Address</th>
            <th>Contact</th>
            <th>DOB</th>
            <th>Designation</th>
            <th>Email</th>
            <th>NOW</th>

            {/* <div className={Styles.fixed_col}>
              <th>Options</th>
            </div> */}
          </tr>
        </a.thead>
        {alumni ? (
          <tbody>
            {alumni.map((alumni, index) => (
              <AdminDataTableRow
                alumni={alumni}
                key={index}
                id={index}
              // type="alumni-details"
              // onDeleteAlumni={onDeleteAlumniHandler}
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

export default AlumniDataTable;
