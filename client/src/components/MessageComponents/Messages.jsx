import React, { useEffect, useRef, useState } from "react";
import ChatPage from "./ChatPage";
import ChatSelectPage from "./ChatSelectPage";
import ReactPortal from "components/Modal/ReactPortal";
import useGetConversationsForUser from "hooks/useGetConversationsForUser";
import useGetMessagesForConversation from "hooks/useGetMessagesForConversation";
import { useMessageContext } from "context/messageContext/messageContext";
import styles from "./Messages.module.css";
import { MessageStatus } from "lib/enum";

const Messages = () => {
  const [isChatSelected, setIsChatSelected] = useState(false);
  const [isMessagesActive, setIsMessagesActive] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState();

  const {
    messageStatus,
    closeMessageModal,
    selectedConversation: conversationFromContext,
  } = useMessageContext();

  useEffect(() => {
    setSelectedConversation(conversationFromContext);
    setIsChatSelected(conversationFromContext ? true : false);
  }, [conversationFromContext]);

  const {
    messages,
    isLoading: isMessagesLoading,
    error: errorOnMessages,
  } = useGetMessagesForConversation(selectedConversation);

  const {
    conversations,
    isLoading: isConversationsLoading,
    error: errorOnConversation,
  } = useGetConversationsForUser();

  const onChatSelectHandler = (conversationId) => {
    setSelectedConversation(conversationId);
    setIsChatSelected(true);
  };

  const onMinimize = () => {
    setIsMessagesActive((prev) => !prev);
  };

  const onCloseHandler = () => {
    closeMessageModal();
  };

  const onGoBackHandler = () => {
    setIsChatSelected(false);
  };

  const newMessageHandler = () => {};

  return (
    messageStatus !== MessageStatus.NONE && (
      <ReactPortal scrollable wrapperId="messages_content_wrapper">
        <div
          className={`${styles.messages_container} ${
            isMessagesActive && styles.active
          }`}
        >
          {!isChatSelected ? (
            <ChatSelectPage
              isMessagesActive={isMessagesActive}
              setIsMessagesActive={setIsMessagesActive}
              setIsChatSelected={setIsChatSelected}
              isConversationsLoading={isConversationsLoading}
              conversations={conversations}
              onMinimize={onMinimize}
              onChatSelect={onChatSelectHandler}
              onClose={onCloseHandler}
            />
          ) : (
            <ChatPage
              conversationId={selectedConversation}
              isMessagesLoading={isMessagesLoading}
              messages={messages}
              onMinimize={onMinimize}
              isMessagesActive={isMessagesActive}
              onGoBack={onGoBackHandler}
              onSendNewMessage={newMessageHandler}
            />
          )}
        </div>
      </ReactPortal>
    )
  );
};

export default Messages;
