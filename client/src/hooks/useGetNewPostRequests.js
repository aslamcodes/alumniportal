import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

export function useGetPostRequests() {
  const { fetchData, isLoading, error } = useAxiosWithCallback();
  const [postRequests, setPostRequests] = useState([]);

  useEffect(() => {
    const config = {
      url: "/api/v1/forum/post-requests",
    };
    fetchData(config, setPostRequests);
  }, [fetchData]);

  return { isLoading, error, postRequests };
}
