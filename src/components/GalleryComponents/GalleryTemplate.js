import React from 'react'
import styles from "./GalleryTemplate.module.css"

function GalleryTemplate({ fname, sname, data }) {
  const imgSrc = "https://source.unsplash.com/random/"

  // test data:
  const dimension = ["300x300", "400x400", "500x500", "600x600", "700x700", "800x800", "900x900", "1000x1000"];
  let images = [];
  for (let i = 0; i < 10; i++) {
    let d = Math.floor(Math.random() * 8);
    let dm = dimension[d];
    let Src = imgSrc.concat(dm);
    console.log('src: ', Src);
    images.push(<img key={i} src={Src} alt="" />);
  }


  return (
    <div className={styles.gallery_container}>
      <div className={styles.header}>
        <h1>{fname} <span>{sname}</span></h1>
      </div>

      <div className={styles.gallery_content}>
        {images}

      </div>
    </div>
  )
}

export default GalleryTemplate