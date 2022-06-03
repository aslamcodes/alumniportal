import { useState } from "react";
import Divider from "../Divider";
import Styles from "./CommentBox.module.css";
import ReplyBox from "./ReplyBox";
import ReplyButton from "./ReplyButton";
import ReplyForm from "./ReplyForm";

const CommentBox = ({ commentData }) => {
  const { user, comment, replies } = commentData;
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  return (
    <div className={Styles.comment_container}>
      <div
        className={Styles.comment_box}
        onClick={(e) => {
          e.preventDefault();
          setShowReplies(false);
          setShowReplyForm(false);
        }}
      >
        <div className={Styles.heading}>
          <img src={user.profile_image} />
          <p className={Styles.username}>{user.name}</p>
        </div>
        <p>{comment}</p>
        {!showReplies && !showReplyForm && (
          <Divider bgColor={"#000"} mb={".5em"} mt={".5em"} />
        )}
      </div>
      {!showReplies && !showReplyForm && (
        <>
          <div className={Styles.comment_action_container}>
            <p
              onClick={() => {
                setShowReplies(true);
              }}
            >
              View Replies
            </p>
            <p
              onClick={() => {
                setShowReplyForm(true);
              }}
            >
              Reply
            </p>
          </div>
        </>
      )}
      {showReplies && (
        <div className={Styles.replies_container}>
          {replies.map((reply, idx) => (
            <ReplyBox reply={reply} />
          ))}
          <ReplyButton />
        </div>
      )}
      {showReplyForm && <ReplyForm />}
    </div>
  );
};

export default CommentBox;
