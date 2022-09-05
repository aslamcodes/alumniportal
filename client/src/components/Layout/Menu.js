import React from 'react'
import styles from './Menu.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from 'context/auth/authContext';
function Menu({ setMenuActive, setShowProfile }) {
  const location = useLocation();
  const { user } = useAuthContext();
  const handleClick = () => {
    setMenuActive(false);
  }
  return (
    <div className={`${styles.dropdownContainer} ${styles.background_blur}`} >
      <CloseIcon className={styles["dropdown-close"]} onClick={() => { setMenuActive(false) }} />
      <div className={`${styles.navLink}`} >
        <Link onClick={handleClick} to="/">Home</Link>
        <Link onClick={handleClick} to="/gallery">Gallery</Link>
        <Link onClick={handleClick} to="/events">Events</Link>
        {!user && <Link onClick={handleClick} to="login">Login</Link>}
        {user?.isAdmin && <Link onClick={handleClick} to="/admin">Admin</Link>}
        {user?.token && (
          <Link
            to={location.pathname}
            onClick={() => {
              setShowProfile((prev) => !prev);
              handleClick();
            }}
          >
            Profile
          </Link>
        )}
        <Link onClick={handleClick} to="/alumni-forum">Alumini Forum</Link>
        <Link onClick={handleClick} to="/office-bearers">Office Bearers</Link>
      </div>
    </div>
  )
}

export default Menu