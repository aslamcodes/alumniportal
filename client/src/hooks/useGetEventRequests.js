import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

export function useGetEventRequests() {
  const { isLoading, error, fetchData } = useAxiosWithCallback();
  const [requests, setRequests] = useState();

  useEffect(() => {
    const config = {
      url: "/api/v1/events/requests",
    };
    fetchData(config, setRequests);
  }, [fetchData]);

  return { isLoading, error, requests };
}
