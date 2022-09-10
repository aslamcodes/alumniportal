import { useCallback, useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";
import useScrollPositionThrottled from "./useScrollPositionThrottled";

const useGetForumPosts = (user, element) => {
  const { isLoading, error, fetchData } = useAxiosWithCallback();
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const getConfig = useCallback(
    (offset = 0) => ({
      url: user
        ? `/api/v1/forum/feed_v2_alpha?author=${user}`
        : `/api/v1/forum/feed_v2_alpha?offset=${offset}`,
    }),
    [user]
  );

  const trigger = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    fetchData(getConfig(0), setPosts);
  }, [fetchData, getConfig, refresh]);

  useScrollPositionThrottled(
    ({ atBottom }) => {
      if (atBottom && hasMore) {
        fetchData(getConfig(posts.length), (newPosts) => {
          setPosts((prev) => [...prev, ...newPosts]);
          setHasMore(newPosts.length === 5);
        });
      }
    },
    element,
    []
  );

  return { isLoading, error, posts, trigger };
};

export default useGetForumPosts;
