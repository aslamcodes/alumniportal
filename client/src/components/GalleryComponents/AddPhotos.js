import React, { useState } from 'react'
import { BiImageAdd } from 'react-icons/bi';
import styles from './AddPhotos.module.css';
const AddPhotos = () => {
  const [image, setImage] = useState(undefined);
  const [imageSwitch, setImageSwitch] = useState(false);
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(
        image || undefined,
      );
      return;
    }
    setImage(
      e.target.files[0],
    );
  };

  return (
    <div className={styles.add_photos_container} onClick={(e) => e.stopPropagation()}>
      <div className={styles.image_input_container}
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
        {image ?
          <img
            className={`${styles.image_blur}`}
            src={URL.createObjectURL(image)}
            alt="upload"
          /> :
          <label for="img-input">
            <BiImageAdd size="50px" color='black' />
          </label>
        }
        <input
          name="post_images"
          id="img-input"
          type="file"
          onChange={onSelectFile}
        />
      </div>
      <button>
        Add Image
      </button>
    </div >
  )
}

export default AddPhotos