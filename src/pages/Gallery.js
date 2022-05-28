import React from "react";
import styles from "./Gallery.module.css";
const Gallery = () => {
  return (
    <div className={styles.gallery}>
      <h1>Gallery</h1>
      <hr />
      <div className={styles.galleryItems}>
        <div className={styles.galleryItem}>
          <div className={styles.itemImg}>
            <img src="https://picsum.photos/id/1/200/300" alt="gallery" />
          </div>
          <hr />
          <div className={styles.itemTitle}>
            <h2>ALUMNI <span>MEET</span></h2>
          </div>
        </div>
        <hr />
        <div className={styles.galleryItem}>
          <div className={styles.itemTitle}>
            <h2><span>ALL</span> PHOTOS</h2>
          </div>
          <hr />
          <div className={styles.itemImg}>
            <img src="https://picsum.photos/id/2/200/300" alt="gallery" />
          </div>
        </div>
        <hr />
        <div className={styles.galleryItem}>
          <div className={styles.itemTitle}>
            <h2><span>SEMINAR</span> SESSIONS</h2>
          </div>
          <hr />
          <div className={styles.itemImg}>
            <img src="https://picsum.photos/id/3/200/300" alt="gallery" />
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Gallery;
