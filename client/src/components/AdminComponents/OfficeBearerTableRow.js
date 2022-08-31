import React, { useState } from 'react'
import styles from './OfficeBearerTableRow.module.css'

// const 

function OfficeBearerTableRow({ alumni}) {
  console.log(alumni)
  return (
    <tr className={styles.office_bearer_row}>
      <td>{alumni?.user?.registerNumber}</td>
      <td>{alumni?.user?.name}</td>
      <td>{alumni?.user?.department}</td>
      <td>{alumni?.designation}</td>
      <td>{alumni?.organization}</td>
      <td>{alumni?.user?.phoneNumber}</td>
      <td>{alumni?.user?.email}</td>
      <td className={styles.accept}>{"Make as OB"}</td>
    </tr>
  )
}

export default OfficeBearerTableRow;