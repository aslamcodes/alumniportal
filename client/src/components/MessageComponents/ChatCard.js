import Loader from "components/UI/Loader";
import useGetMessagesForConversation from "hooks/useGetMessagesForConversation";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./ChatCard.module.css";
const ChatCard = ({ setIsActive, conversation }) => {
  const recipients = conversation.participants.filter(
    (person) => person._id !== conversation.createdBy._id
  );
  const { messages, isLoading, error } = useGetMessagesForConversation(
    conversation?._id
  );

  return (
    <div className={styles.chatCard_container}>
      <div className={styles.chatCard_profile}>
        <img src={require("assets/christopher.jpg")} alt="" />
      </div>
      <div className={styles.chatCard_body}>
        <div
          className={styles.chatCard_details}
          onClick={() => setIsActive(true)}
        >
          <div>
            <h3>{recipients[0].name}</h3>
            {isLoading ? (
              <Loader />
            ) : (
              <p>{messages[messages.length - 1]?.content}</p>
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
