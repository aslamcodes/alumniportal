import React from "react";
import styles from "./Gallery.module.css";
const Gallery = () => {
  return (
    <div className={styles.gallery}>
      <h1>Gallery</h1>
      <hr />
      <div className={styles.galleryItems}>
        <div className={styles.galleryItem}>
          <img src="https://picsum.photos/id/1/200/300" alt="gallery" />
          <hr />
          <h2>ALUMNI <span>MEET</span></h2>
        </div>
        <hr />
        <div className={styles.galleryItem}>
          <h2><span>ALL</span> PHOTOS</h2>
          <hr />
          <img src="https://picsum.photos/id/2/200/300" alt="gallery" />
        </div>
        <hr />
        <div className={styles.galleryItem}>
          <h2><span>SEMINAR</span> SESSIONS</h2>
          <hr />
          <img src="https://picsum.photos/id/3/200/300" alt="gallery" />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Gallery;
