import { useAuthContext } from "context/auth/authContext";
import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

export default function useFetchNotification() {
  const { isLoading, fetchData, error } = useAxiosWithCallback();
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const config = {
      url: "/api/v1/users/notifications",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    user && fetchData(config, setNotifications);
  }, [fetchData, user]);
  console.log(notifications);
  return { isLoading, error, notifications };
}
