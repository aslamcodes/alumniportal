import styles from "./Messages.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import Loader from "components/UI/Loader";
import ChatCard from "./ChatCard";
import useGetConversationsForUser from "hooks/useGetConversationsForUser";

const ChatSelectPage = ({ isMessagesActive, onClose, onChatSelect }) => {
  const {
    conversations,
    isLoading: isConversationsLoading,
    error: errorOnConversation,
  } = useGetConversationsForUser();

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
          <AiOutlinePlus className={styles.add_btn} fontSize={20} />
          <GrFormClose
            className={styles.close_btn}
            fontSize={20}
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

export default ChatSelectPage;
