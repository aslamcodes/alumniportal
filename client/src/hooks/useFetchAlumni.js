import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

export default function useGetAlumni() {
  const [alumni, setAlumni] = useState();
  const { isLoading, fetchData, error } = useAxiosWithCallback();
  const [refresh, setRefresh] = useState();

  useEffect(() => {
    const applyAlumni = ({ alumni }) => {
      setAlumni(alumni);
    };

    const fetchAlumni = async () => {
      await fetchData(
        {
          url: "/api/v1/alumni/v2",
        },
        applyAlumni
      );
    };

    fetchAlumni();
  }, [fetchData, refresh]);

  const trigger = () => {
    setRefresh(Math.random());
  };

  return { isLoading, error, alumni, trigger };
}
