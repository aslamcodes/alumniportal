import React, { useEffect, useState } from 'react'
import styles from "./GalleryTemplate.module.css"


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}


function GalleryTemplate({ fname, sname, data }) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const [noImage, setNoImage] = useState(1);
  const [imageSwitch, setImageSwitch] = useState(
    {
      imageActive: 0,
      imageTop: null,
      imageBottom: 1,
    }
  )

  // test data:
  let Data = [];
  const testData = (n) => {
    const imgSrc = "https://source.unsplash.com/random/"
    const dimension = ["300x300", "400x400", "500x500", "600x600", "700x700", "800x800", "900x900", "1000x1000"];
    for (let i = 0; i < n; i++) {
      let images = [];
      for (let j = 0; j < 10; j++) {
        let d = Math.floor(Math.random() * 8);
        let dm = dimension[d];
        let Src = imgSrc.concat(dm);
        images.push(Src);
      }
      Data.push(images);
    }
    return Data;
  }

  Data = testData(noImage);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    if (windowDimensions.width > 1020) {
      setNoImage(3);
    } else if (windowDimensions.width > 780) {
      setNoImage(2);
    } else {
      setNoImage(1);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = event => {
    console.log('scrollTop: ', event.currentTarget.scrollTop);
    console.log('offsetHeight: ', event.currentTarget.scrollBottom);
  };

  const handleClick = (e) => {

    let id = parseInt(e.target.id);
    setImageSwitch({
      imageActive: id,
      imageTop: id - 1,
      imageBottom: id + 1,
    })
  }

  return (
    <div className={styles.gallery_container}>
      <div className={styles.header}>
        <h1>{fname} <span>{sname}</span></h1>
      </div>

      <div className={styles.gallery_content} onScroll={handleScroll}>

        {Data.map((images, index1) => {
          return (
            <div key={index1} className={styles.gallery_img}>
              {images.map((image, index) => {
                return (
                  <img key={index} id={index} src={image} alt="" className={
                    `${imageSwitch.imageActive === index && styles.image_active || imageSwitch.imageTop === index && styles.image_top || imageSwitch.imageBottom === index && styles.image_bottom}`
                  }
                    onClick={handleClick}
                  />
                )
              })}
            </div>
          )
        })}


      </div>
    </div>
  )
}

export default GalleryTemplate