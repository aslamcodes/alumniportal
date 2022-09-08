import React, { useEffect } from "react";
import Styles from "./Admin.module.css";
import AdminSidebar from "components/AdminComponents/AdminSidebar";
import AlumniDataTable from "components/AdminComponents/AlumniDataTable";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "context/auth/authContext";

const AlumniData = () => {
  useEffect(() => {
    document.title = "Alumni Portal | Admin";
  }, []);
  const { user } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin || !user) navigate("/");
  }, [user, navigate]);

  return (
    <div className={Styles.admin_container}>
      <AdminSidebar />
      <main className={Styles.main}>
        <AlumniDataTable />
      </main>
    </div>
  );
};

export default AlumniData;
