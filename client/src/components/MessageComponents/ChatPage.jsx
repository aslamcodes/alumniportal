import Divider from "components/UI/Divider";
import Loader from "components/UI/Loader";
import { useAuthContext } from "context/auth/authContext";
import { useSocketContext } from "context/socket/socketContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import useGetConversationByID from "hooks/useGetConversationByID";
import useGetMessagesForConversation from "hooks/useGetMessagesForConversation";
import { ClientSocketEvents } from "lib/enum";
import { uniqueId } from "lodash";
import { useEffect, useRef, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { IoIosArrowBack, IoIosSend } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TbLockOpen } from "react-icons/tb";
import ChatBubble from "./ChatBubble";
import styles from "./Messages.module.css";

const ChatPage = ({
  isMessagesActive,
  onMinimize,
  onGoBack,
  conversationId,
  onSendNewMessage,
}) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const { conversation, isLoading, error } =
    useGetConversationByID(conversationId);

  const {
    messages,
    isLoading: isMessagesLoading,
    error: errorOnMessages,
  } = useGetMessagesForConversation(conversationId);

  const [receivedMessages, setReceivedMessages] = useState(messages || []);

  const { user } = useAuthContext();
  const { fetchData: sendMessage } = useAxiosWithCallback();
  const { socket } = useSocketContext();

  const recipient = conversation?.participants?.filter(
    (person) => person._id !== user?._id
  )[0];

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    setReceivedMessages(messages);
  }, [messages]);

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
            <h3> Your messages are not e2e encrypted</h3>{" "}
            <TbLockOpen fontSize={17} />
          </div>

          {errorOnMessages && (
            <div className={styles.e2e_info}>
              <Divider />
              <h3> There's a problem in retrieving messages</h3>{" "}
              <FiAlertCircle fontSize={17} />
            </div>
          )}

          {isMessagesLoading && !errorOnMessages ? (
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
            fontSize={30}
            className={styles.send_btn}
            onClick={onSubmitHandler}
          />
        </div>
      </>
    </>
  );
};

export default ChatPage;
