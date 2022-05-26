import React from "react";
import styles from "./ForumCard.module.css";
const ForumCard = ({ data }) => {
  return (
    <div className={styles.post_container}>
      <div className={styles.header}>
        <div className={styles.userinfo_container}>
          <img src={data.user.profile_image} />
          <p className={styles.user_name}>{data.user.name}</p>
        </div>
      </div>

      <div>
        <div className={styles.post_image_container}>
          <img src={data.post.images[0]} />
        </div>
      </div>

      <div className={styles.post_action_container}></div>

      <div className={styles.post_caption_container}>
        <p>{data.user.name}</p>
        <p>{data.post.caption}</p>
      </div>
    </div>
  );
};

export default ForumCard;
