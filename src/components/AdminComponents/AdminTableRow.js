import React, { useState } from "react";
import { useSpring, a, config } from "react-spring";
const AdminTableRow = () => {
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
      <td>20TUIT01</td>
      <td>Yolo Ramesh</td>
      <td>Computer Science</td>
      <td>Software Engineer</td>
      <td>Jumpack Co</td>
      <td>7878789898</td>
      <td>yr12j2@gmail.com</td>
      <td></td>
    </a.tr>
  );
};

export default AdminTableRow;
