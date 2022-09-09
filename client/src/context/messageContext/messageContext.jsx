import { MessageStatus } from "lib/enum";
import React, { createContext, useContext, useState } from "react";
import { useCallback } from "react";

const initialState = {
  messageStatus: MessageStatus.NONE,
  openMessageModal: (conversation) => {},
  closeMessageModal: () => {},
  selectedConversation: null,
};

const MessageContext = createContext(initialState);
MessageContext.displayName = "MessageContext";

const MessageContextProvider = ({ children }) => {
  const [messageStatus, setMessageStatus] = useState(MessageStatus.NONE);
  const [selectedConversation, setSelectedConversation] = useState();

  const openMessageModal = useCallback((conversation) => {
    setSelectedConversation(conversation);
    setMessageStatus(MessageStatus.OPEN);
  }, []);

  const closeMessageModal = useCallback(() => {
    setSelectedConversation(null);
    setMessageStatus(MessageStatus.NONE);
  }, []);

  return (
    <MessageContext.Provider
      value={{
        messageStatus,
        openMessageModal,
        closeMessageModal,
        selectedConversation,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  const context = useContext(MessageContext);

  if (!context)
    throw new Error(
      "useMessageContext Hook must be defined within a context provider"
    );

  return context;
};

export default MessageContextProvider;
