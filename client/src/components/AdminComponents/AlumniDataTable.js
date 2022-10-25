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
import useAlumniDataSearch from "hooks/useAlumniDataSearch";

const AlumniDataTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableHeadOnTop, setTableHeadOnTop] = useState(false);

  const { count } = useCountAlumniData();
  const uptoIndex = currentPage * entriesPerPage;
  const { alumniData, error, isLoading } = useGetAlumniData(
    uptoIndex,
    entriesPerPage
  );
  const { searchData, error: searchError } = useAlumniDataSearch(searchQuery);



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

  const onSetSearchQuery = (query) => {
    setSearchQuery(query)
    return new Promise((resolve, reject) => {
      if (query !== "") {
        resolve("query updated successfully")
      } else {
        reject("Query update failed");
      }
    });
  };
  const onSearch = async (query) => {
    try {
      await onSetSearchQuery(query);
      setAlumni(
        searchData
      );
    } catch (error) {
      setAlumni(alumniData)
    }
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
    { label: 'Register Number', key: 'registerNumber' },
    { label: 'Name', key: 'name' },
    { label: 'Address', key: 'address' },
    { label: 'Batch', key: 'batch' },
    { label: 'Company', key: 'company' },
    { label: 'Company Address', key: 'companyAddress' },
    { label: 'Contact', key: 'contact' },
    { label: 'DOB', key: 'dateOfBirth' },
    { label: 'Designation', key: 'designation' },
    { label: 'Email', key: 'email' },
    { label: 'Nature of work', key: 'natureOfWork' },
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
