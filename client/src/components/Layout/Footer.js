import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useWindowScrollPositions } from "hooks/useWindowScrollPositions";
import InexoreModal from "components/HomeComponents/InexoreModal";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const Footer = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const [showInexore, setShowInexore] = useState(false);
  const location = useLocation();
  const isInLoginPage = /login/.test(location.pathname);
  const isInRegisterStudent = /register-student/.test(location.pathname);
  const isInRegisterFaculty = /register-faculty/.test(location.pathname);
  const isInRegisterAlumni = /register-alumni/.test(location.pathname);
  const isInForgotPassword = /forgot-password/.test(location.pathname);
  const isInHome = location.pathname === "/";
  const isInAlumniPage = /alumni-forum/.test(location.pathname);
  const isInAdminPage = /admin/.test(location.pathname);
  const isFooterVisible = !isInAlumniPage && !isInAdminPage;
  const isFooterTranslucent =
    isInLoginPage ||
    isInRegisterStudent ||
    isInRegisterFaculty ||
    isInRegisterAlumni ||
    isInHome ||
    isInForgotPassword;

  return (
    isFooterVisible && (
      <div
        className={`${styles["footer"]} ${
          isFooterTranslucent && styles.bg_translucent
        }`}
      >
        <InexoreModal
          isOpen={showInexore}
          closemodal={() => setShowInexore(false)}
        />

        <div className={styles["footer-container"]}>
          <a
            href="https://skct.edu.in/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["footer-brand"]}
          >
            <img src={require("assets/Logo2.png")} alt="College-logo" />
            <h1>SKCT</h1>
          </a>
          <div className={styles["footer-description"]}>
            <p>Copyright </p>
            <AiOutlineCopyrightCircle />
            <p>
              2022 SKCT - All Rights Reserved | Developed by{" "}
              <button
                className={styles.inExore}
                onClick={() => {
                  setShowInexore(true);
                }}
              >
                InExore
              </button>
            </p>
          </div>
          <div className={styles["social"]}>
            <a
              href="https://www.google.com/maps/place/SKCT/@10.9292577,76.9201712,18z/data=!4m9!1m2!2m1!1sskct!3m5!1s0x3ba85b89b0ebc80d:0xe3a7cda7a28a1422!8m2!3d10.9292577!4d76.9222311!15sCgRza2N0kgEHY29sbGVnZeABAA"
              target="_blank"
            >
              <img src={require("assets/icons/map.png")} alt="map icon" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCLtRq0iFEf2BQ2-VECJBUbA"
              target="_blank"
            >
              <img
                src={require("assets/icons/YouTube.png")}
                alt="Youtube icon"
              />
            </a>
            <a href="https://www.facebook.com/skctofficial/" target="_blank">
              <img
                src={require("assets/icons/Facebook.png")}
                alt="Facebook icon"
              />
            </a>
            <a href="https://www.instagram.com/skct__official/" target="_blank">
              <img
                src={require("assets/icons/Instagram.png")}
                alt="Instagram icon"
              />
            </a>
            <a href="https://twitter.com/SkctIt" target="_blank">
              <img
                src={require("assets/icons/Twitter.png")}
                alt="Twitter icon"
              />
            </a>
          </div>
        </div>
      </div>
    )
  );
};

export default Footer;
