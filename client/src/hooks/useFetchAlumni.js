import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

export default function useGetAlumni() {
  const [alumni, setAlumni] = useState();
  const { isLoading, fetchData, error } = useAxiosWithCallback();

  useEffect(() => {
    const applyAlumni = ({ alumni }) => setAlumni(alumni);

    const fetchAlumni = async () => {
      await fetchData(
        {
          url: "/api/v1/alumni/v2",
        },
        applyAlumni
      );
    };

    fetchAlumni();
  }, [fetchData]);

  return { isLoading, error, alumni };
}
