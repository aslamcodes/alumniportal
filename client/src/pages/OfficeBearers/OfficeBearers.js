import useGetAlumniWithCities from "hooks/useGetAlumniWithCities";
import React, { useState } from "react";
import styles from "./OfficeBearers.module.css";
const imgSrc = "https://source.unsplash.com/random/";
const dimension = [
  "300x300",
  "400x400",
  "500x500",
  "600x600",
  "700x700",
  "800x800",
  "900x900",
  "1000x1000",
];
let images = [];
for (let j = 0; j < 10; j++) {
  let d = Math.floor(Math.random() * 8);
  let dm = dimension[d];
  let Src = imgSrc.concat(dm);
  images.push(Src);
}
function OfficeBearers() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const { alumni, cities, isLoading, error } = useGetAlumniWithCities(null);

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
      <div className={styles.city_container}>
        <div className={styles.city}>
          <h2>CITY</h2>
          <ul>
            {cities.map((city) => (
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
          .filter((alumni) => alumni.isAlumni)
          .filter((alumni) =>
            selectedCity ? alumni.city === selectedCity : true
          )
          .map((alumni, index) => {
            return (
              <div
                className={`${styles.OfficeBearer} ${
                  activeIndex == index && styles.OfficeBearer_active
                }`}
                key={index}
              >
                <img
                  src={`http://localhost:8000/api/v1/users/user-avatar/${alumni._id}`}
                  alt="office bearer"
                  id={index}
                  onClick={handleClick}
                />
                <p
                  className={`${styles.show_details} ${
                    activeIndex == index && styles.show_details_active
                  }`}
                >
                  Show Details{">"}{" "}
                </p>
                <p
                  className={`${styles.make_ob} ${
                    activeIndex == index && styles.make_ob_active
                  }`}
                >
                  make as OB
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default OfficeBearers;
