import React from "react";
import styles from "./Gallery.module.css";
const Gallery = () => {
  return (
    <div className={styles.gallery}>
      <h1>Gallery</h1>
      <div className={styles.gallery_container}>
        <div className={styles.gallery_items_container}>
          <div className={styles.gallery_item_container}>
            <div className={styles.gallery_item}>
              <div className={styles.itemImg}>
                <img src="https://picsum.photos/id/1/200/300" alt="gallery" />
              </div>
              <div className={styles.itemTitle}>
                <h2>ALUMNI <span>MEET</span></h2>
              </div>
            </div>
          </div>
          <div className={styles.gallery_item_container}>
            <div className={styles.gallery_item}>
              <div className={styles.itemTitle}>
                <h2><span>ALL</span> PHOTOS</h2>
              </div>

              <div className={styles.itemImg}>
                <img src="https://picsum.photos/id/2/200/300" alt="gallery" />
              </div>
            </div>
          </div>
          <div className={styles.gallery_item_container}>
            <div className={styles.gallery_item}>
              <div className={styles.itemTitle}>
                <h2><span>SEMINAR</span> SESSIONS</h2>
              </div>

              <div className={styles.itemImg}>
                <img src="https://picsum.photos/id/3/200/300" alt="gallery" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
