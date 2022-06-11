
import React, { useState } from 'react';
import ReactPortal from "components/Modal/ReactPortal";
import { IoClose } from "react-icons/io5";
import { BiImageAdd } from "react-icons/bi";
import styles from "./NewPostModal.module.css";

function NewPostModal({ data, setNewPostActive }) {
  const [image, setImage] = useState(null);
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setImage(e.target.files[0]);
  };
  return (
    <ReactPortal wrapperId="new_post_modal_wrapper">
      <div className={styles.new_post_overlay}>
        <div className={styles.new_post_container}>
          <div className={styles.header}>
            <div className={styles.userinfo_container}>
              <img src={data.user.profile_image} />
              <p className={styles.user_name}>{data.user.name}</p>
            </div>
            <IoClose
              size="30px"
              className={styles.close_icon}
              onClick={() => setNewPostActive(false)}
            />
          </div>
          <div className={styles.body}>
            <form action="">
              <div className={styles.input_container}>
                <input type="text" id="cname" placeholder="Company Name" />
              </div>
              <div className={styles.input_container}>
                <input type="text" id="designation" placeholder="Designation" />
              </div>
              <div className={styles.description_container}>
                <div className={styles.input_container}>
                  <input type="text" id="title" placeholder="title" />
                </div>
                <div className={styles.input_container}>
                  <textarea
                    type="text"
                    id="description"
                    placeholder="description"
                  />
                </div>
              </div>
              <div className={styles.img_input_container}>
                {image ? (
                  <img src={URL.createObjectURL(image)} />
                ) : (
                  <div className={styles.img_input}>
                    <label for="img-input">
                      <BiImageAdd size="50px" />
                      <p>Add Image</p>
                    </label>
                    <input id="img-input" type="file" onChange={onSelectFile} />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
}

export default NewPostModal;
