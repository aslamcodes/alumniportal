import React from 'react'
import styles from './Footer.module.css'
import CopyrightIcon from '@mui/icons-material/Copyright';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <div className={styles["footer"]}>
      <div className={styles["footer-container"]}>
        <div className={styles["top"]}>
          <div className={styles["left"]}>
            <div className={styles["name"]}>
              <img src={require("../assets/Logo2.png")} alt="SKCT logo" />
              <p>Sri Krishna College of Technology
                Autonomus Institutuion
              </p>

            </div>
            <p>Mail Id: principal@skcet.ac.in placement@skcet.ac.in</p>
          </div>
          <div className={styles["right"]}>
            <p>Kovaipudur, Coimbatore
              TamilNadu - 641042
              Phone: 0422-2678001, Fax:0422-2678012</p>
          </div>
        </div>
        <hr />
        <div className={styles["bottom"]}>
          <div className={styles["left"]}>
            <CopyrightIcon fontSize="small" />
            <p>2022 SKCT - All Rights Reserved | Designed by InExore</p>
          </div>
          <div className={styles["right"]}>
            <p>Follow us on</p>
            <YouTubeIcon fontSize="medium" />
            <FacebookIcon fontSize="medium" />
            <InstagramIcon fontSize="medium" />
            <TwitterIcon fontSize="medium" />

          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
