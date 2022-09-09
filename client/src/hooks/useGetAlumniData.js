import { useCallback, useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";
import useScrollPositionThrottled from "./useScrollPositionThrottled";

const useGetAlumniData = (offset, entries) => {
  const { isLoading, error, fetchData } = useAxiosWithCallback();
  const [alumniData, setAlumniData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [refresh, setRefresh] = useState(0);

  const trigger = () => {
    setRefresh(Math.random());
  };

  useEffect(() => {
    fetchData(
      {
        url: "/api/v1/alumni-data",
        params: {
          offset,
          entries,
        },
      },
      (alumni) => {
        setAlumniData(alumni);
        setHasMore(alumni?.length === entries);
      }
    );
  }, [fetchData, refresh, entries, offset]);

  return { isLoading, error, alumniData, trigger, hasMore };
};

export default useGetAlumniData;
