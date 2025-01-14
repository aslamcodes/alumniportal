import React, { useEffect, useState } from "react";
import ForumCard from "components/ForumComponents/ForumCard";
import NewPostModal from "components/ForumComponents/NewPostModal";
import ProfileModal from "components/ForumComponents/ProfileModal";
import Styles from "./AlumniForum.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import useGetForumPosts from "hooks/useGetForumPosts";

import { useAuthContext } from "context/auth/authContext";
import Loader from "components/UI/Loader";
import ErrorDialogue, { ErrorWrapper } from "components/UI/ErrorDialogue";

function AlumniForum() {
  useEffect(() => {
    document.title = "Alumni Portal | Alumni Forum";
  }, []);
  const [newPostActive, setNewPostActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);
  const { user } = useAuthContext();

  const { isLoading, error, posts, trigger } = useGetForumPosts();

  if (error) {
    return <ErrorWrapper errorMessage={error.message} />;
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.forum_container}>
        {posts?.map((post, idx) => (
          <ForumCard
            key={post._id + idx + post.tittle}
            data={post}
            trigger={trigger}
          />
        ))}
        {isLoading && <Loader />}
      </div>

      {user?.token && (
        <div
          className={Styles.new_post_button}
          onClick={() => setNewPostActive(true)}
        >
          <div className={Styles.new_post_name}>New Post</div>
          <div className={Styles.new_post_icon}>
            <AiOutlinePlus />
          </div>
        </div>
      )}
      {newPostActive && <NewPostModal setNewPostActive={setNewPostActive} />}
      {profileActive && (
        <ProfileModal handleClose={() => setProfileActive(false)} />
      )}
    </div>
  );
}

export default AlumniForum;
