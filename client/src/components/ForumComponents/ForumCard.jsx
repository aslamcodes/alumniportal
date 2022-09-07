import React, { useEffect, useState } from "react";
import styles from "./ForumCard.module.css";
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import CommentModal from "./CommentModal";
import PostModal from "./PostModal";
import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import ProfileModal from "./ProfileModal";
import { GrClose } from "react-icons/gr";
import { useAlertContext } from "context/alert/alertContext";
import { useNavigate } from "react-router-dom";
import config from "config/config";

const ForumCard = ({ data, profileActive, profileEdit }) => {
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { user } = useAuthContext();
  const { fetchData, isLoading } = useAxiosWithCallback();
  const [liked, setLiked] = useState(
    user ? data?.likes?.map((like) => like.user._id).includes(user?._id) : false
  );
  const { success } = useAlertContext();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const shareButtonHandler = (postId) => {
    navigator.clipboard
      .writeText(`${config.CLIENT_URL}/alumni-forum/${postId}`)
      .then(() => {
        success("Post link copied to clipboard");
      });
  };

  const onLikePostHandler = async () => {
    if (!user?.token) {
      success("Sign in to like a post");
      navigate("/login");
      return;
    }
    const likeConfig = {
      url: `/api/v1/forum/like/${data._id}`,
      method: "patch",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    await fetchData(likeConfig, (res) => {
      setLiked((prev) => !prev);
    });
  };

  return (
    <div className={`${styles.post_container} `}>
      <CommentModal
        postId={data?._id}
        comments={data?.comments}
        handleClose={() => {
          setIsCommentsModalOpen(false);
        }}
        isOpen={isCommentsModalOpen}
      />
      <PostModal
        post={data}
        isOpen={isPostModalOpen}
        handleClose={() => {
          setIsPostModalOpen(false);
        }}
      />
      {isProfileModalOpen && (
        <ProfileModal
          userId={data?.user?._id}
          handleClose={() => {
            setIsProfileModalOpen(false);
          }}
        />
      )}
      <div className={`${styles.header} ${profileActive && styles.shadow}`}>
        <div
          className={styles.userinfo_container}
          onClick={() => {
            setIsProfileModalOpen(true);
          }}
        >
          <img
            src={`http://localhost:8000/api/v1/users/user-avatar/${data?.user?._id}`}
            alt={data?.post?.title}
          />
          <p className={styles.user_name}>{data?.user?.name}</p>
        </div>
        <div className={styles.post_action_container}>
          <div disabled={isLoading} onClick={onLikePostHandler}>
            {liked ? (
              <AiFillHeart fontSize={22} />
            ) : (
              <AiOutlineHeart fontSize={22} />
            )}
          </div>
          <div
            onClick={() => {
              setIsCommentsModalOpen(true);
            }}
          >
            <BsChat fontSize={20} />
          </div>
          <div>
            <AiOutlineShareAlt
              fontSize={21}
              onClick={() => {
                shareButtonHandler(data?._id);
              }}
            />
          </div>
          {profileActive && profileEdit && <GrClose fontSize={20} />}
        </div>
      </div>
      <div className={styles.post_image_container}>
        <img
          src={`http://localhost:8000/api/v1/forum/image/${data?.post?.images[0]}`}
          className={`${profileActive && styles.shadow}`}
          alt="post"
        />
        <div className={styles.post_overlay}></div>
        <div className={styles.post_caption_container}>
          <p>{data?.post?.title}</p>
          <p>
            {data?.post?.desc?.slice(0, 500)}
            {"..."}
            <span
              onClick={() => {
                setIsPostModalOpen(true);
              }}
            >
              View More
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForumCard;
