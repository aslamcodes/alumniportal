import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

export default function useCountAlumniData() {
  const [count, setCount] = useState(0);
  const { isLoading, fetchData, error } = useAxiosWithCallback();
  const [refresh, setRefresh] = useState();

  useEffect(() => {
    fetchData(
      {
        url: "/api/v1/alumni-data/count",
      },
      (count) => setCount(count)
    );
  }, [fetchData, refresh]);

  const trigger = () => {
    setRefresh(Math.random());
  };

  return { isLoading, error, count, trigger };
}
