import ForumCard from "components/ForumComponents/ForumCard";
import Loader from "components/UI/Loader";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ForumPost.module.css";

const ForumPost = () => {
  const { fetchData, isLoading, error } = useAxiosWithCallback();
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!postId) {
      return navigate("/alumni-forum");
    }
    const config = {
      url: `/api/v1/forum/post/${postId}`,
    };
    fetchData(config, setPost);
  }, [fetchData, postId]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <div>
      <ForumCard data={post} />
    </div>
  );
};

export default ForumPost;
