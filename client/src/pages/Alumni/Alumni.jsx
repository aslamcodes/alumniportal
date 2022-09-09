import AlumnusCard from "components/AlumniComponents/AlumnusCard";
import Messages from "components/MessageComponents/Messages";
import Loader from "components/UI/Loader";
import { useAlertContext } from "context/alert/alertContext";
import { useAuthContext } from "context/auth/authContext";
import useGetAlumni from "hooks/useFetchAlumni";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Alumni.module.css";

const Alumni = () => {
  const { isLoading, error, alumni } = useGetAlumni();
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [conversationToOpen, setConversationToOpen] = useState(null);

  const { errorAlert } = useAlertContext();

  const onNewConversationHandler = (conversation) => {
    setIsMessagesOpen(true);
    setConversationToOpen(conversation);
  };

  useEffect(() => {
    if (!user?.token)
      navigate("/login", {
        state: {
          from: location.pathname,
        },
      });
  }, [navigate, location, user]);
  useEffect(() => {
    if (error) {
      errorAlert(error);
    }
  }, [errorAlert, error]);

  if (isLoading) return <Loader />;

  return (
    <main className={styles.main}>
      {isMessagesOpen && (
        <Messages
          conversation={conversationToOpen}
          onClose={() => {
            setIsMessagesOpen(false);
          }}
        />
      )}
      {alumni?.map((alumnus) => (
        <AlumnusCard
          onNewConversation={onNewConversationHandler}
          alumnus={alumnus}
        />
      ))}
    </main>
  );
};

export default Alumni;
