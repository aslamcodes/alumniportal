import React, { useEffect, useMemo, useRef, useState } from "react";
import Loader from "components/UI/Loader";
import styles from "./OfficeBearerTable.module.css";
import AdminTableHeader from "./AdminTableHeader";
import useGetAlumni from "hooks/useFetchAlumni";
import { a, useSpring } from "react-spring";
import OfficeBearerTableRow from "./OfficeBearerTableRow";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import { useAuthContext } from "context/auth/authContext";

const OfficeBearerTable = () => {
  const { user } = useAuthContext();
  const { alumni: alumniData, error, isLoading, trigger } = useGetAlumni();
  const { fetchData: setOfficeBearer } = useAxiosWithCallback();
  const { fetchData: removeOfficeBearer } = useAxiosWithCallback();
  const [alumni, setAlumni] = useState(alumniData);
  const [tableHeadOnTop, setTableHeadOnTop] = useState(false);
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
  return (
    <div className={styles.office_bearer_container}>
      <AdminTableHeader
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
        <tbody>
          {alumniData?.map((data) => (
            <OfficeBearerTableRow
              alumni={data}
              type="office bearers"
              approveOfficeBearerHandler={onSetOfficeBearer}
              removeOfficeBearer={onRemoveOfficeBearer}
            />
          ))}

        </tbody>
      </table>
    </div>
  )
};

export default OfficeBearerTable;
