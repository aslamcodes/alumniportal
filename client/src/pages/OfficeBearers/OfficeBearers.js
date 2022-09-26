import ProfileModal from "components/ForumComponents/ProfileModal";
import Loader from "components/UI/Loader";
import { useAlertContext } from "context/alert/alertContext";
import useGetAlumniWithCities from "hooks/useGetAlumniWithCities";
import React, { useState, useEffect } from "react";
import OfficeBearerCard from "./OfficeBearerCard";
import styles from "./OfficeBearers.module.css";
import { isNull } from "lodash";
import ErrorDialogue, { ErrorWrapper } from "components/UI/ErrorDialogue";

function OfficeBearers() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isProfileModalActive, setIsProfileModalActive] = useState(false);
  const [selectedAlumniId, setSelectedAlumniId] = useState(null);

  const { alumni, cities, isLoading, error } = useGetAlumniWithCities(null);

  const { errorAlert } = useAlertContext();

  useEffect(() => {
    document.title = "Alumni Portal | Office Bearers";
  }, []);

  useEffect(() => {
    !isNull(selectedAlumniId)
      ? setIsProfileModalActive(true)
      : setIsProfileModalActive(false);
  }, [selectedAlumniId]);

  if (error) return <ErrorWrapper errorMessage={error.message} />;

  const onAlumniCardClick = (alumni) => {
    setSelectedAlumniId(alumni.user._id);
  };

  const handleProfileModalClose = () => {
    setSelectedAlumniId(null);
  };

  return (
    <div className={styles.OfficeBearers_container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isProfileModalActive && (
            <ProfileModal
              userId={selectedAlumniId}
              handleClose={handleProfileModalClose}
            />
          )}

          <div className={styles.city_container}>
            <div className={styles.city}>
              <h2>CITY</h2>
              <ul>
                {cities?.map((city) => (
                  <li
                    onClick={() => {
                      setSelectedCity(city);
                    }}
                    className={city === selectedCity && styles.active}
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
                  <OfficeBearerCard
                    key={index}
                    isActive={index === activeIndex}
                    alumni={alumni}
                    onAlumniClick={onAlumniCardClick}
                  />
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default OfficeBearers;
