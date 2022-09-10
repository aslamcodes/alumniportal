import { useAuthContext } from "context/auth/authContext";
import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

export default function useGetMessagesForConversation(conversationId) {
  const [messages, setMessages] = useState([]);
  const { isLoading, error, fetchData } = useAxiosWithCallback();
  const { user } = useAuthContext();
  const [count, setCount] = useState(0);
  useEffect(() => {
    const config = {
      url: `/api/v1/conversation/${conversationId}/messages`,
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    user && conversationId && fetchData(config, setMessages);
  }, [fetchData, user, conversationId, count]);

  const trigger = () => {
    setCount((prev) => prev + 1);
  };

  return { messages, isLoading, error, trigger };
}
