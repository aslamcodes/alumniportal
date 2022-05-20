import React, { useState, useEffect } from 'react'

import { ReactComponent as SKIicon } from "../assets/SKI.svg";
import { ReactComponent as SKCTicon } from "../assets/SKCT.svg";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import styles from "./Navbar.module.css";
import { Link } from 'react-router-dom';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


const Navbar = () => {

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log('windowDimensions', windowDimensions);

  return (
    <div className={styles["navbar"]}>
      {windowDimensions.width > 789 &&
        <div className={`${styles.navLink}`} >
          <Link to="/">Home</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/events">Events</Link>
        </div>
      }
      {windowDimensions.width > 789 ?
        <div className={styles["navbar-brand"]}>
          <div className={styles["navbar-logo"]}>
            {/* <SKIicon className={styles["skctlogo1"]} /> */}
            <img src={require("../assets/Logo1.png")} alt="" />

          </div>
          <div className={styles["titleText"]}>
            <h1>SRI KRISHNA COLLEGE OF TECHNOLOGY</h1>
            <h3>AUTONOMOUS INSTITUTION | ACCREDITED BY NAAC WITH ‘A’ GRADE</h3>
          </div>
          <div className={styles["navbar-logo"]}>
            {/* <SKCTicon className={styles["skctlogo2"]} /> */}
            <img src={require("../assets/Logo2.png")} alt="" />
          </div>
        </div> :
        <div className={styles["navbar-brand"]}>
          {windowDimensions.width > 350 &&
            <div className={styles["navbar-logo"]}>
              <SKIicon className={styles["skctlogo1"]} />
              <hr />
            </div>
          }
          <div className={styles["titleText"]}>
            <p>SKCT</p>
          </div>
        </div>
      }
      {windowDimensions.width > 789 ?
        <div className={`${styles.navLink} ${styles.right}`}>
          <Link to="/alumini-forum">Alumini Forum</Link>
          <Link to="/office-bearers">Office Bearers</Link>
        </div> :
        <div className={`${styles.dropdown} }`}>
          {!menuActive &&
            <MenuIcon className={styles["dropdown-btn"]} onClick={() => { setMenuActive(true) }} />
          }
          {menuActive &&
            <div className={`${styles.dropdownContainer}`}>
              <CloseIcon className={styles["dropdown-close"]} onClick={() => { setMenuActive(false) }} />
              <div className={`${styles.navLink}`} >
                <Link to="/">Home</Link>
                <Link to="/gallery">Gallery</Link>
                <Link to="/events">Events</Link>
                <Link to="/alumini-forum">Alumini Forum</Link>
                <Link to="/office-bearers">Office Bearers</Link>
              </div>
            </div>
          }
        </div>
      }

    </div >
  )
}

export default Navbar;