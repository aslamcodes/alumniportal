import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

const useGetAlumniWithCities = () => {
  const [alumni, setAlumni] = useState([]);
  const [cities, setCities] = useState([]);
  const { isLoading, error, fetchData } = useAxiosWithCallback();

  useEffect(() => {
    const alumniConfig = {
      url: "/api/v1/alumni/v2?office-bearer=true",
    };
    const citiesConfig = {
      url: `/api/v1/alumni/cities?office-bearer=true`,
    };
    fetchData(alumniConfig, ({ alumni }) => setAlumni(alumni));
    fetchData(citiesConfig, ({ cities }) => setCities(cities));
  }, [fetchData]);

  return {
    alumni,
    cities,
    isLoading,
    error,
  };
};

export default useGetAlumniWithCities;
