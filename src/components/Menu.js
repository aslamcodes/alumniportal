import React from 'react'
import styles from './Menu.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
function Menu({ setMenuActive }) {
  return (
    <div className={`${styles.dropdownContainer} ${styles.background_blur}`} >
      <CloseIcon className={styles["dropdown-close"]} onClick={() => { setMenuActive(false) }} />
      <div className={`${styles.navLink}`} >
        <Link onClick={() => setMenuActive(false)} to="/">Home</Link>
        <Link onClick={() => setMenuActive(false)} to="/gallery">Gallery</Link>
        <Link onClick={() => setMenuActive(false)} to="/events">Events</Link>
        <Link onClick={() => setMenuActive(false)} to="/alumini-forum">Alumini Forum</Link>
        <Link onClick={() => setMenuActive(false)} to="/office-bearers">Office Bearers</Link>
      </div>
    </div>
  )
}

export default Menu