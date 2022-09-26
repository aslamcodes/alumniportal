import React, { useEffect, useRef, useState } from "react";
import { TbLockOpen } from "react-icons/tb";
import styles from "./Messages.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import ChatCard from "./ChatCard";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowBack, IoIosSend } from "react-icons/io";
import ChatBubble from "./ChatBubble.js";
import useGetConversationsForUser from "hooks/useGetConversationsForUser";
import useGetMessagesForConversation from "hooks/useGetMessagesForConversation";
import Loader from "components/UI/Loader";
import useGetConversationByID from "hooks/useGetConversationByID";
import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import { GrFormClose } from "react-icons/gr";
import ReactPortal from "components/Modal/ReactPortal";
import { useMessageContext } from "context/messageContext/messageContext";
import { ClientSocketEvents, MessageStatus } from "lib/enum";
import { useSocketContext } from "context/socket/socketContext";
import { uniqueId } from "lodash";

const ChatSelectPage = ({
  isConversationsLoading,
  isMessagesActive,
  onClose,
  onChatSelect,
  conversations,
}) => {
  const onChatSelectHandler = (conversationId) => {
    onChatSelect(conversationId);
  };

  const onCloseHandler = () => {
    onClose();
  };

  return (
    <>
      <div className={styles.messages_header}>
        Messages (alpha)
        <div className={styles.messages_actions}>
          <AiOutlinePlus className={styles.add_btn} fontSize={25} />
          <GrFormClose
            className={styles.close_btn}
            fontSize={30}
            onClick={onCloseHandler}
          />
        </div>
      </div>

      <>
        <hr className={styles.hr_header} />
        <div
          className={`${styles.chat_container} ${
            isMessagesActive && styles.active
          }`}
        >
          {isConversationsLoading ? (
            <Loader />
          ) : (
            conversations?.map((conversation) => (
              <ChatCard
                onSelect={onChatSelectHandler}
                conversation={conversation}
              />
            ))
          )}
        </div>
      </>
    </>
  );
};

const ChatPage = ({
  isMessagesActive,
  messages,
  onMinimize,
  isMessagesLoading,
  onGoBack,
  conversationId,
  onSendNewMessage,
}) => {
  const [receivedMessages, setReceivedMessages] = useState(messages || []);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const { conversation, isLoading, error } =
    useGetConversationByID(conversationId);

  const { user } = useAuthContext();
  const { fetchData: sendMessage } = useAxiosWithCallback();
  const { socket } = useSocketContext();

  const recipient = conversation?.participants?.filter(
    (person) => person._id !== user?._id
  )[0];

  useEffect(() => {
    socket.on(ClientSocketEvents.RECEIVE_MESSAGE, (data) => {
      if (recipient?._id === data.senderId) {
        setReceivedMessages((prev) => [
          ...prev,
          {
            _id: uniqueId(data.message),
            content: data.message,
            conversation: conversationId,
            sender: recipient,
          },
        ]);
      }
    });

    return () => {
      socket.off(ClientSocketEvents.RECEIVE_MESSAGE);
    };
  }, [socket, setReceivedMessages, recipient, conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [receivedMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const onSubmitHandler = () => {
    socket.emit(ClientSocketEvents.SEND_MESSAGE, {
      receiverId: recipient._id,
      senderId: user?._id,
      message,
    });

    const messageConfig = {
      url: "/api/v1/conversation/message/" + conversationId,
      method: "post",
      headers: {
        Authorization: "Bearer " + user?.token,
      },
      data: {
        content: message,
      },
    };

    setReceivedMessages((prev) => [
      ...prev,
      {
        _id: uniqueId(message),
        content: message,
        conversation: conversationId,
        sender: user?._id,
      },
    ]);

    sendMessage(messageConfig);
    onSendNewMessage();
    setMessage("");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.messages_header}>
        <div className={styles.chat_profile}>
          <div>
            <IoIosArrowBack
              className={styles.back_btn}
              fontSize={20}
              onClick={onGoBack}
            />
          </div>
          <img src={`/api/v1/users/user-avatar/${recipient?._id}`} alt="" />
          <div>{recipient?.name}</div>
        </div>
        <div className={styles.messages_actions}>
          <RiArrowDropDownLine
            className={styles.arrow_btn}
            fontSize={35}
            onClick={onMinimize}
          />
        </div>
      </div>

      <>
        <hr className={styles.hr_header} />
        <div
          className={`${styles.chat_container} ${styles.chat} ${
            isMessagesActive && styles.active
          }`}
        >
          <div className={styles.e2e_info}>
            <h3> Your messages are not e2e encrypted </h3>
            <TbLockOpen fontSize={17} />
          </div>

          {isMessagesLoading ? (
            <Loader />
          ) : (
            receivedMessages?.map(({ content, sender }) => {
              return (
                <ChatBubble
                  type={sender === user?._id ? 1 : 0}
                  message={content}
                />
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className={styles.input_container}>
          <span
            className={styles.textarea}
            role="textbox"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={(e) => setMessage(e.currentTarget.textContent)}
          >
            {message}
          </span>
          <IoIosSend
            font-size={30}
            className={styles.send_btn}
            onClick={onSubmitHandler}
          />
        </div>
      </>
    </>
  );
};

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
      <ReactPortal wrapperId="messages_content_wrapper">
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
