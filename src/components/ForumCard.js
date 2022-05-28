import React, { useState } from "react";
import styles from "./ForumCard.module.css";
import {
  ChatBubbleOutlineRounded,
  Favorite,
  FavoriteBorder,
  Share,
} from "@mui/icons-material";
import CommentModal from "./../components/UI/CommentModal";
const ForumCard = ({ data }) => {
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  return (
    <div className={styles.post_container}>
      <CommentModal
        comments={data.comments}
        handleClose={() => {
          setIsCommentsModalOpen(false);
        }}
        isOpen={isCommentsModalOpen}
      />
      <div className={styles.header}>
        <div className={styles.userinfo_container}>
          <img src={data.user.profile_image} />
          <p className={styles.user_name}>{data.user.name}</p>
        </div>
        <div className={styles.post_action_container}>
          {false ? <Favorite /> : <FavoriteBorder />}
          <div
            onClick={() => {
              setIsCommentsModalOpen(true);
            }}
          >
            <ChatBubbleOutlineRounded />
          </div>
          <Share />
        </div>
      </div>
      <div className={styles.post_image_container}>
        <img src={data.post.images[0]} />
        <div className={styles.post_overlay}></div>
        <div className={styles.post_caption_container}>
          <p>{data.post.caption.title}</p>
          <p>{data.post.caption.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ForumCard;
