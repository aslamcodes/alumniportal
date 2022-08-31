import { useAuthContext } from "context/auth/authContext";
import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

export default function useGetConversationsForUser() {
  const [conversations, setConversations] = useState();
  const { isLoading, error, fetchData } = useAxiosWithCallback();
  const { user } = useAuthContext();

  useEffect(() => {
    const config = {
      url: "/api/v1/conversation",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    user && fetchData(config, setConversations);
  }, [fetchData, user]);

  return { conversations, isLoading, error };
}
