import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

export default function useGetAlumniStoredData() {
  const [alumni, setAlumni] = useState();
  const { isLoading, fetchData, error } = useAxiosWithCallback();
  const [refresh, setRefresh] = useState();


  useEffect(() => {
    const config = {
      url: "/api/v1/alumni-data",
    };
    fetchData(config, setAlumni);
  }, [refresh, fetchData]);

  const trigger = () => {
    setRefresh(Math.random());
  };

  return { isLoading, error, alumni, trigger };
}
