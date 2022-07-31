import React, { useState } from "react";
import { useSpring, a, config } from "react-spring";
import Styles from "./AdminTableRow.module.css";

const AdminTableRow = ({ alumni, type }) => {
  const [isHovered, setIsHover] = useState(false);
  const props = useSpring({
    config: config.stiff,
    from: {
      background: "#fff",
    },
    to: {
      background: isHovered ? "#FFFCDC" : "#fff",
    },
  });

  return (
    <a.tr
      style={props}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => {
        setIsHover(false);
      }}
      className={Styles.fixed_col}
    >
      <td>{alumni?.user?.registerNumber}</td>
      <td>{alumni?.user?.name}</td>
      <td>{alumni?.user?.course}</td>
      <td>{alumni?.designation}</td>
      <td>{alumni?.organization}</td>
      <td>{alumni?.user?.phoneNumber}</td>
      <td>{alumni?.user?.email}</td>
      {type == "alumni-details" && (
        <td>
          <p className={Styles.decline}>Delete</p>
        </td>
      )}
      {type == "request-details" && (
        <td>
          <p className={Styles.accept}>Accept</p>
          <p className={Styles.decline}>Reject</p>
        </td>
      )}
      {type == "reject-details" && (
        <td>
          <p className={Styles.accept}>Reaccept</p>
        </td>
      )}
    </a.tr>
  );
};

export default AdminTableRow;
