import React from 'react'
import styles from './Menu.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from 'context/auth/authContext';
function Menu({ setMenuActive, setShowProfile }) {
  const location = useLocation();
  const { user } = useAuthContext();
  return (
    <div className={`${styles.dropdownContainer} ${styles.background_blur}`} >
      <CloseIcon className={styles["dropdown-close"]} onClick={() => { setMenuActive(false) }} />
      <div className={`${styles.navLink}`} >
        <Link onClick={() => setMenuActive(false)} to="/">Home</Link>
        <Link onClick={() => setMenuActive(false)} to="/gallery">Gallery</Link>
        <Link onClick={() => setMenuActive(false)} to="/events">Events</Link>
        {!user && <Link to="login">Login</Link>}
        {user?.isAdmin && <Link to="/admin">Admin</Link>}
        {user?.token && (
          <Link
            to={location.pathname}
            onClick={() => {
              setShowProfile((prev) => !prev);
            }}
          >
            Profile
          </Link>
        )}
        <Link onClick={() => setMenuActive(false)} to="/alumni-forum">Alumini Forum</Link>
        <Link onClick={() => setMenuActive(false)} to="/office-bearers">Office Bearers</Link>
      </div>
    </div>
  )
}

export default Menu