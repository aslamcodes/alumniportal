import { useRef, useState } from "react";
import { GrFormEdit } from "react-icons/gr";
import { RiSendPlaneFill } from "react-icons/ri";
import Styles from "./ReplyButton.module.css";

const ReplyButton = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const inputRef = useRef(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      onClick={() => {
        setIsFormOpen(true);
        inputRef.current.focus();
      }}
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
    </form>
  );
};

export default ReplyButton;
