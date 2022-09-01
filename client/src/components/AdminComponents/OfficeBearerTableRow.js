import React, { useState } from 'react'
import styles from './OfficeBearerTableRow.module.css'
import Loader from "components/UI/Loader";


function OfficeBearerTableRow({ alumni, ...rest }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnApproveOfficeBearer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await rest.approveOfficeBearerHandler(alumni?.user?._id);
    setIsLoading(false);
  };
  const handleOnRemoveOfficeBearer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await rest.removeOfficeBearer(alumni?.user?._id);
    setIsLoading(false);
  };
  return (
    <tr className={styles.office_bearer_row}>
      <td>{alumni?.user?.registerNumber}</td>
      <td>{alumni?.user?.name}</td>
      <td>{alumni?.user?.department}</td>
      <td>{alumni?.designation}</td>
      <td>{alumni?.organization}</td>
      <td>{alumni?.user?.phoneNumber}</td>
      <td>{alumni?.user?.email}</td>
      <td>
        {
          isLoading ? (
            <Loader />
          ) : (
            !alumni?.isOfficeBearer ?
              <p className={styles.accept} onClick={handleOnApproveOfficeBearer}>
                Make as OB
              </p>
              :
              <p className={styles.decline} onClick={handleOnRemoveOfficeBearer}>
                Remove as OB
              </p>
          )}
      </td>
    </tr>
  )
}

export default OfficeBearerTableRow;