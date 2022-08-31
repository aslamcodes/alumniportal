import { useAuthContext } from "context/auth/authContext";
import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

export default function useGetConversationByID(conversationId) {
  const [conversation, setConversation] = useState();
  const { isLoading, error, fetchData } = useAxiosWithCallback();
  const { user } = useAuthContext();

  useEffect(() => {
    const config = {
      url: "/api/v1/conversation/" + conversationId,
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    user && fetchData(config, setConversation);
  }, [fetchData, user, conversationId]);

  return { conversation, isLoading, error };
}
