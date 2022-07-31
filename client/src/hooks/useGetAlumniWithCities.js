import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

const useGetAlumniWithCities = (city) => {
  const [alumni, setAlumni] = useState([]);
  const [cities, setCities] = useState([]);
  const { isLoading, error, fetchData } = useAxiosWithCallback();

  useEffect(() => {
    const alumniConfig = {
      url: city ? `/api/v1/alumni/city/${city}` : "/api/v1/alumni",
    };
    const citiesConfig = {
      url: `/api/v1/alumni/cities`,
    };

    fetchData(alumniConfig, ({ alumni }) => setAlumni(alumni));
    fetchData(citiesConfig, ({ cities }) => setCities(cities));
  }, [city]);

  return {
    alumni,
    cities,
    isLoading,
    error,
  };
};

export default useGetAlumniWithCities;
