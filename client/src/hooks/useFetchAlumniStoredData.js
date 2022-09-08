import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

export function useFetchAlumniStoredData({ email }) {
  const {
    isLoading,
    error,
    fetchData: fetchStoredAlumni,
  } = useAxiosWithCallback();

  const [alumni, setAlumni] = useState();

  useEffect(() => {
    if (email) {
      const config = {
        url: "/api/v1/alumni-data/alumni",
        data: {
          email,
        },
      };

      fetchStoredAlumni(config, (storedAlumni) => setAlumni(storedAlumni));
    }
  }, [email, fetchStoredAlumni]);

  return { isLoading, error, alumni };
}
