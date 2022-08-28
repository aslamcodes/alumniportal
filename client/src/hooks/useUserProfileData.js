import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

export default function useUserProfileData(userId) {
  const { fetchData, isLoading, error } = useAxiosWithCallback();
  const [user, setUser] = useState();

  useEffect(() => {
    const config = {
      url: `/api/v1/users/${userId}`,
    };

    fetchData(config, setUser);
  }, [userId, fetchData]);

  return { isLoading, error, user };
}
