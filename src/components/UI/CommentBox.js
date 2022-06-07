import { useEffect, useRef, useState } from "react";
import { animated, config, useSpring, useTransition } from "react-spring";
import { useMeasure } from "react-use";

import Divider from "../Divider";
import Styles from "./CommentBox.module.css";
import ReplyBox from "./ReplyBox";
import ReplyButton from "./ReplyButton";
import ReplyForm from "./ReplyForm";

const CommentBox = ({ commentData }) => {
  const { user, comment, replies } = commentData;
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContainerRef, { height }] = useMeasure();
  const [replyContainerHeight, setReplyContainerHeight] = useState("0");
  const repliesContainerTransitions = useTransition(showReplies, {
    from: {
      y: 0,
      opacity: 0,
    },
    enter: {
      height: 100,
      opacity: 1,
    },
    leave: {
      y: 0,
      opacity: 0,
    },

    config: config.wobbly,
  });

  useEffect(() => {
    setReplyContainerHeight(height);
  }, [height]);

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
      {repliesContainerTransitions((style, item) => {
        return (
          item && (
            <animated.div
              style={{ ...style, height: style.y.to((y) => `${y}vh`) }}
            >
              <div ref={replyContainerRef} className={Styles.replies_container}>
                {replies.map((reply, idx) => (
                  <ReplyBox id={idx} reply={reply} />
                ))}
                <ReplyButton />
              </div>
            </animated.div>
          )
        );
      })}

      {showReplyForm && <ReplyForm />}
    </div>
  );
};

export default CommentBox;
