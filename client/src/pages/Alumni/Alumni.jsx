import AlumnusCard from "components/AlumniComponents/AlumnusCard";
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
        <AlumnusCard alumnus={alumnus} />
      ))}
    </main>
  );
};

export default Alumni;
