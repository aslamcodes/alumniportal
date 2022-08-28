import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

const useGetForumPosts = (offset = 0, user) => {
  const { isLoading, error, fetchData } = useAxiosWithCallback();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const config = {
      url: user
        ? `/api/v1/forum/feed_v2_alpha?author=${user}`
        : `/api/v1/forum/feed_v2_alpha?offset=${offset}`,
    };
    fetchData(config, setPosts);
  }, [offset, fetchData, user]);

  return { isLoading, error, posts };
};

export default useGetForumPosts;
