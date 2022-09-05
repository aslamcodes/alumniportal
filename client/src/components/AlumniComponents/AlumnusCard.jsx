import ProfileModal from "components/ForumComponents/ProfileModal";
import Divider from "components/UI/Divider";
import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import React, { useState , useEffect} from "react";
import Styles from "./AlumnusCard.module.css";

const AlumnusCard = ({ alumnus, onNewConversation }) => {
  useEffect(() => {
    document.title="Alumni Portal | Alumni"
  },[]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState();
  const {
    isLoading,
    error,
    fetchData: createConversation,
  } = useAxiosWithCallback();

  const { user } = useAuthContext();

  const handleClose = () => {
    setIsProfileModalOpen(false);
  };

  const handleOnMessageClick = () => {
    const conversationConfig = {
      url: "/api/v1/conversation/",
      method: "post",
      headers: {
        Authorization: "Bearer " + user?.token,
      },
      data: {
        receiver: alumnus.user._id,
      },
    };
    createConversation(conversationConfig, (conversation) => {
      onNewConversation(conversation._id);
    });
  };

  return (
    <div className={Styles.profile_card}>
      {isProfileModalOpen && (
        <ProfileModal userId={alumnus.user._id} handleClose={handleClose} />
      )}
      <img
        onClick={() => {
          setIsProfileModalOpen(true);
        }}
        alt={"profile"}
        className={Styles.user_profile}
        src={`/api/v1/users/user-avatar/${alumnus.user._id}`}
      />
      <div className={Styles.user_info_container}>
        <h3>
          {alumnus.user.name}{" "}
          <span>
            {alumnus.user.department}{" "}
            {new Date(alumnus.user.yearOfPassing).getFullYear()}
          </span>
        </h3>
        <Divider />
        <p>
          {alumnus.designation} at {alumnus.organization}
        </p>
        <p>{alumnus.user.city}</p>
      </div>
      <button onClick={handleOnMessageClick} className={Styles.message_button}>
        Message
      </button>
    </div>
  );
};

export default AlumnusCard;
