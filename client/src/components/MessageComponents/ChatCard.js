import Loader from "components/UI/Loader";
import { useAuthContext } from "context/auth/authContext";
import useGetMessagesForConversation from "hooks/useGetMessagesForConversation";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./ChatCard.module.css";

const ChatCard = ({ conversation, onSelect }) => {
  const { user } = useAuthContext();

  const recipients = conversation.participants.filter(
    (person) => person._id !== user._id
  );

  const { messages, isLoading, error } = useGetMessagesForConversation(
    conversation?._id
  );

  const onClickHandler = (conversationId) => {
    onSelect(conversationId);
  };

  if (!recipients[0]) return;

  return (
    <div className={styles.chatCard_container}>
      <div className={styles.chatCard_profile}>
        <img src={`/api/v1/users/user-avatar/${recipients[0]?._id}`} alt="" />
      </div>
      <div className={styles.chatCard_body}>
        <div
          className={styles.chatCard_details}
          onClick={() => onClickHandler(conversation?._id)}
        >
          <div>
            <h3>{recipients[0]?.name}</h3>
            {isLoading ? (
              <Loader />
            ) : (
              <p>
                {messages[messages.length - 1]?.content ||
                  "Click to start messaging"}
              </p>
            )}
          </div>
          <IoIosArrowForward
            className={styles.arrow_forward_btn}
            fontSize={20}
          />
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ChatCard;
