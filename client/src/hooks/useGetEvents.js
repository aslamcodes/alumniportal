import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

const useGetEvents = () => {
  const { isLoading, error, fetchData } = useAxiosWithCallback();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const config = {
      url: "/api/v1/events",
    };
    fetchData(config, setEvents);
  }, []);

  return { isLoading, events, error };
};

export default useGetEvents;
