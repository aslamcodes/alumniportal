import Loader from "components/UI/Loader";
import React, { useState } from "react";
import { useSpring, a, config } from "react-spring";
import Styles from "./AdminTableRow.module.css";

const AdminTableRow = ({ alumni, type, ...rest }) => {
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

  const handleOnApproveAlumni = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await rest.approveAlumniHandler(alumni?.user?._id);
    setIsLoading(false);
  };

  const handleOnRejectAlumni = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await rest.rejectAlumni(alumni?._id);
    setIsLoading(false);
  };

  const handleOnDeleteAlumni = () => {};

  const handleReapproveAlumni = () => {};

  return (
    <a.tr
      style={props}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => {
        setIsHover(false);
      }}
      className={Styles.fixed_col}
    >
      {type === "alumni-details" && (
        <>
          <td>{alumni?.user?.registerNumber}</td>
          <td>{alumni?.user?.name}</td>
          <td>{alumni?.user?.course}</td>
          <td>{alumni?.designation}</td>
          <td>{alumni?.organization}</td>
          <td>{alumni?.user?.phoneNumber}</td>
          <td>{alumni?.user?.email}</td>
        </>
      )}

      {type === "request-details" && (
        <>
          <td>{alumni?.user?.registerNumber}</td>
          <td>{alumni?.user?.name}</td>
          <td>{alumni?.alumni_data?.courseName}</td>
          <td>{alumni?.alumni_data?.designation}</td>
          <td>{alumni?.alumni_data?.companyName}</td>
          <td>{alumni?.user?.phoneNumber}</td>
          <td>{alumni?.user?.email}</td>
        </>
      )}
      {type === "reject-details" && (
        <>
          <td>{alumni?.user?.registerNumber}</td>
          <td>{alumni?.user?.name}</td>
          <td>{alumni?.alumni_data?.courseName}</td>
          <td>{alumni?.alumni_data?.designation}</td>
          <td>{alumni?.alumni_data?.companyName}</td>
          <td>{alumni?.user?.phoneNumber}</td>
          <td>{alumni?.user?.email}</td>
        </>
      )}

      {type === "alumni-details" && (
        <td>
          <button className={Styles.decline}>Delete</button>
        </td>
      )}
      {type === "request-details" &&
        (isLoading ? (
          <Loader />
        ) : (
          <td>
            <button onClick={handleOnApproveAlumni} className={Styles.accept}>
              Accept
            </button>
            <button onClick={handleOnRejectAlumni} className={Styles.decline}>
              Reject
            </button>
          </td>
        ))}
      {type === "reject-details" && (
        <td>
          <button className={Styles.accept}>Reaccept</button>
        </td>
      )}
    </a.tr>
  );
};

export default AdminTableRow;
