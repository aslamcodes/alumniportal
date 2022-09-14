import Loader from "components/UI/Loader";
import React, { useState } from "react";
import { useSpring, a, config } from "react-spring";
import Styles from "./AdminTableRow.module.css";

const AdminDataTableRow = ({ alumni, type, ...rest }) => {
  const [isHovered, setIsHover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    >
      <td>{alumni?.registerNumber}</td>
      <td>{alumni?.name}</td>
      <td>{alumni?.address}</td>
      <td>{alumni?.batch}</td>
      <td>{alumni?.company}</td>
      <td>{alumni?.companyAddress}</td>
      <td>{alumni?.contact}</td>
      <td>{alumni?.dateOfBirth}</td>
      <td>{alumni?.designation}</td>
      <td>{alumni?.email}</td>
      <td>{alumni?.natureOfWork}</td>

    </a.tr>
  );
};

export default AdminDataTableRow;
