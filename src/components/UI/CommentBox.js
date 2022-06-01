import { useState } from "react";
import Divider from "../Divider";
import Styles from "./CommentBox.module.css";
import ReplyBox from "./ReplyBox";

const CommentBox = ({ commentData }) => {
  const { user, comment, replies } = commentData;
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className={Styles.comment_container}>
      <div
        className={Styles.comment_box}
        onClick={(e) => {
          e.preventDefault();
          setShowReplies(false);
        }}
      >
        <img src={user.profile_image} />
        <p className={Styles.username}>{user.name}</p>
        <p>{comment}</p>
        {!showReplies && (
          <Divider bgColor={"#898989"} mb={".5em"} mt={".5em"} />
        )}
      </div>
      {!showReplies && (
        <>
          <div className={Styles.comment_action_container}>
            <p
              onClick={() => {
                setShowReplies(true);
              }}
            >
              View Replies
            </p>
            <p onClick={() => {}}>Reply</p>
          </div>
        </>
      )}
      {showReplies && (
        <div className={Styles.replies_container}>
          {replies.map((reply, idx) => (
            <ReplyBox reply={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
