import Loader from "components/UI/Loader";
import { useAlertContext } from "context/alert/alertContext";
import useGetAlumniWithCities from "hooks/useGetAlumniWithCities";
import React, { useState, useEffect } from "react";
import styles from "./OfficeBearers.module.css";

function OfficeBearers() {
  useEffect(() => {
    document.title = "Alumni Portal | Office Bearers"
  }, []);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const { alumni, cities, isLoading, error } = useGetAlumniWithCities(null);

  const { errorAlert } = useAlertContext();

  useEffect(() => {
    if (error) {
      errorAlert("404! error");
    }
  }, [error, errorAlert])
  const handleClick = (e) => {
    const id = e.target.id;
    if (id === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(id);
    }
  };

  return (
    <div className={styles.OfficeBearers_container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.city_container}>
            <div className={styles.city}>
              <h2>CITY</h2>
              <ul>
                {cities?.map((city) => (
                  <li
                    onClick={() => {
                      setSelectedCity(city);
                    }}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <hr />
          <div className={styles.OfficeBearers}>
            {alumni
              ?.filter((alumni) => alumni?.user?.isAlumni)
              .filter((alumni) =>
                selectedCity ? alumni.user.city === selectedCity : true
              )
              .map((alumni, index) => {
                return (
                  <div
                    className={`${styles.OfficeBearer} ${activeIndex === index && styles.OfficeBearer_active
                      }`}
                    key={index}
                  >
                    <img
                      src={`http://localhost:8000/api/v1/users/user-avatar/${alumni.user._id}`}
                      alt="office bearer"
                      id={index}
                      onClick={handleClick}
                    />
                    <p
                      className={`${styles.show_details} ${activeIndex === index && styles.show_details_active
                        }`}
                    >
                      Show Details{">"}{" "}
                    </p>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default OfficeBearers;
