import { useRef, useState } from "react";
import { GrFormEdit } from "react-icons/gr";
import { RiSendPlaneFill } from "react-icons/ri";
import { animated, config, useSpring } from "react-spring";
import Styles from "./ReplyButton.module.css";

const ReplyButton = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const inputRef = useRef(null);
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
  return (
    <animated.form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      onClick={() => {
        setIsFormOpen(true);
        inputRef.current.focus();
      }}
      style={props}
      className={`${Styles.reply_form} ${
        isFormOpen && Styles.reply_form_expanded
      }`}
    >
      <input
        ref={inputRef}
        placeholder={"Reply"}
        onBlur={(e) => {
          if (e.target.value.trim().length === 0) {
            setIsFormOpen(false);
          }
        }}
      />
      {isFormOpen ? <RiSendPlaneFill /> : <GrFormEdit />}
    </animated.form>
  );
};

export default ReplyButton;
