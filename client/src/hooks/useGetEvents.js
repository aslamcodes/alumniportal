import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

const useGetEvents = () => {
  const { isLoading, error, fetchData } = useAxiosWithCallback();
  const [trigger, setTrigger] = useState();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const config = {
      url: "/api/v1/events",
    };
    fetchData(config, setEvents);
  }, [fetchData, trigger]);

  return { isLoading, events, error, setTrigger };
};

export default useGetEvents;
