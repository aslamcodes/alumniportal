import React from "react";
import styles from "./Footer.module.css";
import {
  AiFillYoutube,
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineTwitter,
  AiOutlineCopyrightCircle,
} from "react-icons/ai";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isInAlumniPage = /alumni-forum/.test(location.pathname);
  const isFooterVisible = !isInAlumniPage;
  return (
    isFooterVisible && (
      <div className={styles["footer"]}>
        <div className={styles["footer-container"]}>
          <div className={styles["top"]}>
            <div className={styles["left"]}>
              <div className={styles["name"]}>
                <img src={require("../assets/Logo2.png")} alt="SKCT logo" />
                <p>Sri Krishna College of Technology Autonomus Institutuion</p>
              </div>
              <p>Mail Id: principal@skct.ac.in placement@skct.ac.in</p>
            </div>
            <div className={styles["right"]}>
              <p>
                Kovaipudur, Coimbatore TamilNadu - 641042 Phone: 0422-2678001,
                Fax:0422-2678012
              </p>
            </div>
          </div>
          <hr />
          <div className={styles["bottom"]}>
            <div className={styles["left"]}>
              <AiOutlineCopyrightCircle fontSize="small" />
              <p>2022 SKCT - All Rights Reserved | Designed by InExore</p>
            </div>
            <div className={styles["right"]}>
              <p>Follow us on</p>
              <AiFillYoutube fontSize="medium" />
              <AiFillFacebook fontSize="medium" />
              <AiFillInstagram fontSize="medium" />
              <AiOutlineTwitter fontSize="medium" />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Footer;
