import React, { useState } from "react";
import { useSpring, a, config } from "react-spring";
const AdminTableRow = ({ alumni }) => {
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
    >
      <td>{alumni?.user?.registerNumber}</td>
      <td>{alumni?.user?.name}</td>
      <td>{alumni?.user?.course}</td>
      <td>{alumni?.designation}</td>
      <td>{alumni?.organization}</td>
      <td>{alumni?.user?.phoneNumber}</td>
      <td>{alumni?.user?.email}</td>
      <td></td>
    </a.tr>
  );
};

export default AdminTableRow;
