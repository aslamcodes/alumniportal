import React, { useEffect, useMemo, useRef, useState } from "react";
import Loader from "components/UI/Loader";
import styles from "./OfficeBearerTable.module.css";
import AdminTableHeader from "./AdminTableHeader";
import useGetAlumni from "hooks/useFetchAlumni";
import { a, useSpring } from "react-spring";
import OfficeBearerTableRow from "./OfficeBearerTableRow";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import { useAuthContext } from "context/auth/authContext";
import NoDataMessage from "./NoDataMessage";
import AdminTablePagination from "./AdminTablePagination";

const OfficeBearerTable = () => {
  const { user } = useAuthContext();
  const { alumni: alumniData, error, isLoading, trigger } = useGetAlumni();
  const { fetchData: setOfficeBearer } = useAxiosWithCallback();
  const { fetchData: removeOfficeBearer } = useAxiosWithCallback();
  const [alumni, setAlumni] = useState(alumniData);
  const [tableHeadOnTop, setTableHeadOnTop] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = alumni ? Math.ceil(alumni.length / entriesPerPage) : 0;
  const tableHeadRef = useRef(null);
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

  const adminConfig = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };
  const onSetOfficeBearer = async (alumniID) => {
    await setOfficeBearer(
      {
        ...adminConfig,
        method: "patch",
        url: `/api/v1/alumni/set-office-bearer/${alumniID}`,

      },
      (res) => {
        trigger();
      }
    );
  };
  const onRemoveOfficeBearer = async (alumniID) => {
    await removeOfficeBearer(
      {
        ...adminConfig,
        method: "patch",
        url: `/api/v1/alumni/remove-office-bearer/${alumniID}`,
      },
      (res) => {
        trigger();
      }
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

  return (
    <div className={styles.office_bearer_container}>
      <AdminTableHeader
        onSelect={onEntriesPerPageSelectHandler}
        type="Office Bearers"
      />

      <table id={styles.office_bearer_table}>
        <a.thead style={props} ref={tableHeadRef}>
          <tr className={styles.table_row}>
            <th>Regno</th>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Company</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Options</th>
          </tr>
        </a.thead>
        {alumniData && alumniData.length > 0 ? <tbody>
          {alumniData?.slice(
            currentPage * entriesPerPage - entriesPerPage,
            currentPage * entriesPerPage
          ).map((data) => (
            <OfficeBearerTableRow
              alumni={data}
              type="office bearers"
              approveOfficeBearerHandler={onSetOfficeBearer}
              removeOfficeBearer={onRemoveOfficeBearer}
            />
          ))}

        </tbody>
          :
          <NoDataMessage />
        }
      </table>
      <AdminTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onIncrease={OnIncreaseHandler}
        onDecrease={onDecreaseHandler}
      />
    </div>
  )
};

export default OfficeBearerTable;
