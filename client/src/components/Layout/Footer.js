import React from "react";
import styles from "./Footer.module.css";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isInLoginPage = /login/.test(location.pathname);
  const isInRegisterStudent = /register-student/.test(location.pathname);
  const isInRegisterFaculty = /register-faculty/.test(location.pathname);
  const isInRegisterAlumni = /register-alumni/.test(location.pathname);
  const isInHome = location.pathname === "/";
  const isInAlumniPage = /alumni-forum/.test(location.pathname);
  const isInAdminPage = /admin/.test(location.pathname);
  const isFooterVisible = !isInAlumniPage && !isInAdminPage;
  const isFooterOpaque = isInLoginPage || isInRegisterStudent || isInRegisterFaculty || isInRegisterAlumni || isInHome;

  return (
    isFooterVisible && (
      <div className={`${styles["footer"]} ${isFooterOpaque && styles.bg_opaque}`}>
        <div className={styles["footer-container"]}>
          <div className={styles["footer-brand"]}>
            <img src={require("assets/Logo2.png")} alt="College-logo" />
            <h1>SKCT</h1>
          </div>
          <div className={styles["footer-description"]}>
            <p>Copyright </p>
            <AiOutlineCopyrightCircle />
            <p>
              2022 SKCT - All Rights Reserved | Developed by{" "}
              <span className={styles.inExore}>InExore</span>
            </p>
          </div>
          <div className={styles["social"]}>
            <img src={require("assets/icons/map.png")} alt="map icon" />
            <img src={require("assets/icons/YouTube.png")} alt="Youtube icon" />
            <img
              src={require("assets/icons/Facebook.png")}
              alt="Facebook icon"
            />
            <img
              src={require("assets/icons/Instagram.png")}
              alt="Instagram icon"
            />
            <img src={require("assets/icons/Twitter.png")} alt="Twitter icon" />
          </div>
        </div>
      </div>
    )
  );
};

export default Footer;
