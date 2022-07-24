import React, { useState } from "react";
import styles from "./OfficeBearers.module.css"
// test data:
const imgSrc = "https://source.unsplash.com/random/"
const dimension = ["300x300", "400x400", "500x500", "600x600", "700x700", "800x800", "900x900", "1000x1000"];
let images = [];
for (let j = 0; j < 10; j++) {
  let d = Math.floor(Math.random() * 8);
  let dm = dimension[d];
  let Src = imgSrc.concat(dm);
  images.push(Src);
}
function OfficeBearers() {
  const [activeIndex, setActiveIndex] = useState(
    null
  );
  const handleClick = (e) => {
    const id = e.target.id;
    if (id === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(id);
    }
    console.log('if' + activeIndex);
  }
  return (
    <div className={styles.OfficeBearers_container}>
      <div className={styles.city_container}>
        <div className={styles.city}>
          <h2>CITY</h2>
          <ul>
            <li>Chennai</li>
            <li>Coimbatore</li>
            <li>Bangalore</li>
            <li>Madurai</li>
            <li>Kanyakumari</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className={styles.OfficeBearers}>
        {images.map((image, index) => {
          return (
            <div className={`${styles.OfficeBearer} ${activeIndex == index && styles.OfficeBearer_active}`} key={index} >
              <img src={image} alt="office bearer" id={index} onClick={handleClick} />
              <p className={`${styles.show_details} ${activeIndex == index && styles.show_details_active}`}>Show Details{'>'} </p>
              <p className={`${styles.make_ob} ${activeIndex == index && styles.make_ob_active}`}>make as OB</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OfficeBearers;
