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
    const style = { "--delay": i + 1 }
    images.push(<img key={i} src={Src} delay={i + 1} alt="" />);
  }


  return (
    <div className={styles.gallery_container}>
      <div className={styles.header}>
        <h1>{fname} <span>{sname}</span></h1>
      </div>

      <div className={styles.gallery_content}>
        <img key={1} src={"https://source.unsplash.com/random/400x400"} delay={1} alt="" />
        <img key={2} src={"https://source.unsplash.com/random/500x500"} delay={2} alt="" />
        <img key={3} src={"https://source.unsplash.com/random/600x600"} delay={3} alt="" />
        <img key={3} src={"https://source.unsplash.com/random/700x700"} delay={3} alt="" />

      </div>
    </div>
  )
}

export default GalleryTemplate