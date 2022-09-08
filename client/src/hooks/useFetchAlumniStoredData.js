import { useAlertContext } from "context/alert/alertContext";
import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

export function useFetchAlumniStoredData({ email }) {
  const {
    isLoading,
    error,
    fetchData: fetchStoredAlumni,
  } = useAxiosWithCallback();

  const [alumni, setAlumni] = useState();

  const { successAlert } = useAlertContext();

  useEffect(() => {
    if (email) {
      const config = {
        url: "/api/v1/alumni-data/alumni",
        params: {
          email,
        },
      };

      fetchStoredAlumni(config, (storedAlumni) => {
        successAlert(
          "We've gathered data about you from SKCT Alumni database, please verify it"
        );
        return setAlumni(storedAlumni);
      });
    }
  }, [email, fetchStoredAlumni, successAlert]);

  return { isLoading, error, alumni };
}
