import React, { useEffect, useState } from "react";
import styles from "./GalleryTemplate.module.css";
import ReactPortal from "components/Modal/ReactPortal";
import AddPhotos from "./AddPhotos";
import Loader from "components/UI/Loader";
import { AiOutlinePlus } from "react-icons/ai";
import { useAuthContext } from "context/auth/authContext";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function GalleryTemplate({ fname, sname, data = [], isLoading }) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );


  const [numberOfImages, setNumberOfImages] = useState(1);
  const [imageSwitch, setImageSwitch] = useState({
    imageActive: 0,
    imageTop: null,
    imageBottom: 1,
  });
  const [expand, setExpand] = useState({
    active: false,
    id: 1,
  });
  const [isCardActive, setIsCardActive] = useState(false);
  const { user } = useAuthContext();

  let images = [];
  const getImages = (n) => {
    if (n === 1) {
      images.push(data);
      return images;
    }

    if (n === 2) {
      images.push(data.slice(0, Math.ceil(data.length / 2)));
      images.push(data.slice(Math.ceil(data.length / 2)));
      return images;
    }

    if (n === 3) {
      images.push(data.slice(0, Math.ceil(data.length / 3)));
      images.push(
        data.slice(Math.ceil(data.length / 3), Math.ceil(data.length / 3) * 2)
      );
      images.push(data.slice(Math.ceil(data.length / 3) * 2));
      return images;
    }
  };

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    if (windowDimensions.width > 1020) {
      setNumberOfImages(3);
    } else if (windowDimensions.width > 780) {
      setNumberOfImages(2);
    } else {
      setNumberOfImages(1);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose = () => {
    setExpand({ ...expand, active: false });
  };
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  const handleClick = (e, index1) => {
    let id = parseInt(e.target.id);
    if (id === imageSwitch.imageActive) {
      setExpand({
        active: true,
        id: index1 * 10 + id,
      });
    }
    setImageSwitch({
      imageActive: id,
      imageTop: id - 1,
      imageBottom: id + 1,
    });
  };

  return (
    <div className={styles.gallery_container}>
      <div className={styles.header}>
        <div>
          <h1>
            {fname} <span>{sname}</span>
          </h1>
        </div>
        {/* {user?.token && ( */}
        <div
          className={styles.add_image_button}
          onClick={() => setIsCardActive(!isCardActive)}
        >
          <p>Add </p>
          <div
            className={`${styles.add_image_icon} ${isCardActive && styles.active}`}
          >
            <AiOutlinePlus fontSize={30} />
          </div>
          <AddPhotos isCardActive={isCardActive} />
        </div>

        {/* )} */}

      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.gallery_content}>
          {data.length === 0 ? (
            <p>No Images</p>
          ) : (
            <>
              {getImages(numberOfImages).map((images, index1) => {
                return (
                  <div key={index1} className={styles.gallery_img}>
                    {images.map(({ image }, index) => {
                      return (
                        <div key={index} className={`${user?.token && styles.active} `}>
                          <img
                            id={index}
                            src={`/api/v1/gallery/${image}`}
                            alt=""
                            className={`${(imageSwitch.imageActive === index &&
                              styles.image_active) ||
                              (imageSwitch.imageTop === index &&
                                styles.image_top) ||
                              (imageSwitch.imageBottom === index &&
                                styles.image_bottom)
                              } ${styles.image}`}
                            onClick={(e) => handleClick(e, index1)}
                          />
                          <div
                            className={`${styles.expand_container} ${expand.active &&
                              expand.id === index1 * 10 + index &&
                              styles.expand_container_active
                              }`}
                            onClick={handleClose}
                          >
                            <img
                              id={index}
                              src={`/api/v1/gallery/${image}`}
                              alt=""
                              className={`${styles.image_expand} `}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default GalleryTemplate;
