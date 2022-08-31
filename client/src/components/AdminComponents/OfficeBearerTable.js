import React, { useEffect, useMemo, useRef, useState } from "react";
import Loader from "components/UI/Loader";
import styles from "./OfficeBearerTable.module.css";
import AdminTableHeader from "./AdminTableHeader";
import useGetAlumni from "hooks/useFetchAlumni";
import { a, useSpring } from "react-spring";
import OfficeBearerTableRow from "./OfficeBearerTableRow";

const OfficeBearerTable = () => {
  const { alumni: alumniData, error, isLoading, trigger } = useGetAlumni();
  const [alumni, setAlumni] = useState(alumniData);
  const [tableHeadOnTop, setTableHeadOnTop] = useState(false);
  const tableHeadRef = useRef(null);
    // const { user } = useAuthContext();
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
            <th>Organization</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Options</th>
          </tr>
        </a.thead>
        <tbody>
          {alumniData?.map((alumni)=>(
            <OfficeBearerTableRow
            alumni={alumni}
            // console={console.log(alumni)}
            type="office bearers"
            />
          ))}
          
        </tbody>
      </table>
    </div>
  )
};

export default OfficeBearerTable;
