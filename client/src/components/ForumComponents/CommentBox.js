import { useEffect, useState } from "react";
import Divider from "components/UI/Divider";
import Styles from "./CommentBox.module.css";
import ReplyBox from "./ReplyBox";
import ReplyButton from "components/ForumComponents/ReplyButton";
import ReplyForm from "components/ForumComponents/ReplyForm";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import Loader from "components/UI/Loader";

const CommentBox = ({ commentData }) => {
  const { user, text, replies, _id: commentId } = commentData;
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [hotReplies, setHotReplies] = useState(replies || []);
  const { fetchData: getReplies, isLoading, error } = useAxiosWithCallback();

  const onAddNewReplyHandler = async () => {
    const repliesConfig = {
      url: `/api/v1/forum/replies/${commentId}`,
    };
    await getReplies(repliesConfig, ({ replies }) => setHotReplies(replies));
    setShowReplies(true);
    setShowReplyForm(false);
  };

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
          <img
            src={`http://localhost:8000/api/v1/users/user-avatar/${
              user._id ? user._id : user
            }`}
            alt="profile"
          />
          <p className={Styles.username}>{user.name}</p>
        </div>
        <p>{text}</p>
        {!showReplies && !showReplyForm && (
          <Divider bgColor={"#000"} mb={".5em"} mt={".5em"} />
        )}
      </div>
      {!showReplies && !showReplyForm && (
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
      )}

      {showReplies &&
        (isLoading ? (
          <Loader />
        ) : (
          <div className={Styles.replies_container}>
            {hotReplies.map((reply, idx) => (
              <ReplyBox id={idx} reply={reply} />
            ))}
            <ReplyButton
              onAddNewReply={onAddNewReplyHandler}
              commentId={commentId}
            />
          </div>
        ))}
      {showReplyForm && (
        <ReplyForm comment={commentData} onAddNewReply={onAddNewReplyHandler} />
      )}
    </div>
  );
};

export default CommentBox;
