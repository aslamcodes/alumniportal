import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

const useGetForumPosts = (offset = 0) => {
  const { isLoading, error, fetchData } = useAxiosWithCallback();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const config = {
      url: `/api/v1/forum/feed_v2_alpha?offset=${offset}`,
    };
    fetchData(config, setPosts);
  }, [offset, fetchData]);

  return { isLoading, error, posts };
};

export default useGetForumPosts;
