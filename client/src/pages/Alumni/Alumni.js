import Loader from "components/UI/Loader";
import { useAuthContext } from "context/auth/authContext";
import useGetAlumni from "hooks/useFetchAlumni";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Alumni.module.css";

const Alumni = () => {
  const { isLoading, error, alumni } = useGetAlumni();
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  useEffect(() => {
    if (!user?.token)
      navigate("/login", {
        state: {
          from: location.pathname,
        },
      });
  }, [navigate, location, user]);

  if (isLoading) return <Loader />;

  return (
    <main className={styles.main}>
      {alumni?.map((alumnus) => (
        <div>
          <p>{alumnus.user.name}</p>
          <p>
            working as {alumnus.designation} at {alumnus.organization}
          </p>
          <p>Department {alumnus.user.department}</p>
          <p>City {alumnus.user.city}</p>
          <p>Current Country {alumnus.user.country}</p>
          <button>Message</button>
          <br />
          <br />
        </div>
      ))}
    </main>
  );
};

export default Alumni;
