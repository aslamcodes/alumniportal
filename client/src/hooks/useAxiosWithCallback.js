import { useState, useCallback } from "react";
import axios from "axios";

export default function useAxiosWithCallback() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(null);

  const fetchData = useCallback(
    async (config, callback = () => {}) => {
      const axiosConfig = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          ...config.headers,
        },
        ...config,
      };

      try {
        setIsLoading(true);
        const response = await axios(axiosConfig);
        if (!response.status) {
          throw new Error("Problem connecting to server");
        }
        callback(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refresh]
  );

  const trigger = () => {
    setRefresh(Math.random());
  };

  return { isLoading, error, fetchData, trigger };
}
