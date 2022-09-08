import { navigate } from "@storybook/addon-links";
import Loader from "components/UI/Loader";
import { useAlertContext } from "context/alert/alertContext";
import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import { useRef, useState } from "react";
import { GrFormEdit } from "react-icons/gr";
import { RiSendPlaneFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { a, config, useSpring } from "react-spring";
import Styles from "./ReplyButton.module.css";

const ReplyButton = ({ onAddNewReply, commentId }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [reply, setReply] = useState("");
  const { user } = useAuthContext();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { successAlert, errorAlert } = useAlertContext();

  const { fetchData, isLoading, error } = useAxiosWithCallback();

  const props = useSpring({
    config: {
      ...config.wobbly,
    },
    to: {
      width: isFormOpen ? "100%" : "16%",
      backgroundColor: isFormOpen ? "#f3f2db" : "#000",
      color: isFormOpen ? "#000" : "#fff",
    },
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!user?.token) {
      errorAlert("Sign in to create replies");
      navigate("/login");
      return;
    }
    const replyConfig = {
      url: `/api/v1/forum/reply/${commentId}`,
      method: "post",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      data: {
        reply: reply,
      },
    };
    await fetchData(replyConfig, async (res) => {
      await onAddNewReply();
    });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <a.form
      onSubmit={submitHandler}
      onClick={() => {
        setIsFormOpen(true);
        inputRef.current.focus();
      }}
      style={props}
      className={`${Styles.reply_form} ${isFormOpen && Styles.reply_form_expanded
        }`}
    >
      <input
        ref={inputRef}
        placeholder={"Reply"}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        onBlur={(e) => {
          if (e.target.value.trim().length === 0) {
            setIsFormOpen(false);
          }
        }}
      />
      <button type="submit">
        {isFormOpen ? (
          <RiSendPlaneFill fontSize={25} />
        ) : (
          <GrFormEdit fontSize={30} />
        )}
      </button>
    </a.form>
  );
};

export default ReplyButton;
