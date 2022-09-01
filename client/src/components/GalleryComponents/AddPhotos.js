import { useAlertContext } from "context/alert/alertContext";
import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";

import styles from "./AddPhotos.module.css";
const AddPhotos = ({ isCardActive, type, onAddNewImage }) => {
  const [image, setImage] = useState(undefined);
  const [imageSwitch, setImageSwitch] = useState(false);
  const { user } = useAuthContext();
  const { fetchData } = useAxiosWithCallback();
  const { success } = useAlertContext();

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(image || undefined);
      return;
    }
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const galleryImageData = new FormData();

    if (!image) return success("No Image inserted");

    galleryImageData.append("image", image);
    galleryImageData.append("type", type);

    const config = {
      url: "/api/v1/gallery",
      method: "post",
      headers: {
        Authorization: `Bearer ` + user?.token,
      },
      data: galleryImageData,
    };

    user && (await fetchData(config));

    setImage(null);
    onAddNewImage();
    success("Image has been added to gallery of type " + type.toUpperCase());
  };
  return (
    <>
      {isCardActive && (
        <div
          className={styles.add_photos_container}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={styles.image_input_container}
            onMouseEnter={() => setImageSwitch(true)}
            onMouseLeave={() => setImageSwitch(false)}
          >
            <label for="img-input" alt="switch-icon">
              {image && imageSwitch && (
                <img
                  src={require("assets/image-switch.png")}
                  alt="switch-icon"
                />
              )}
            </label>
            {image ? (
              <img
                className={`${styles.image_blur}`}
                src={URL.createObjectURL(image)}
                alt="upload"
              />
            ) : (
              <label for="img-input">
                <BiImageAdd size="50px" color="black" />
              </label>
            )}
            <input
              name="post_images"
              id="img-input"
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={onSelectFile}
            />
          </div>
          <button onClick={handleSubmit}>Add Image</button>
        </div>
      )}
    </>
  );
};

export default AddPhotos;
