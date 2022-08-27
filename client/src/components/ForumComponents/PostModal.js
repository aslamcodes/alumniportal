import React, { useEffect } from "react";
import { IconContext } from "react-icons";
import { FaTimes } from "react-icons/fa";
import { a, config, useTransition } from "react-spring";
import ReactPortal from "components/Modal/ReactPortal";
import Styles from "./PostModal.module.css";

const PostModal = ({ handleClose, isOpen, setProfileActive, post }) => {
  const postModalTransitions = useTransition(isOpen, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
    config: config.wobbly,
  });

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  return postModalTransitions(
    (style, item) =>
      item && (
        <ReactPortal wrapperId="post_content_wrapper">
          <IconContext.Provider
            value={{
              color: "white",
              className: "react-icons",
            }}
          >
            <a.div style={style} className={Styles.post_modal_overlay}>
              <div className={Styles.post_modal_main}>
                <div className={Styles.post_header}>
                  <div className={Styles.user_info_container}>
                    <img
                      className={Styles.profile_image}
                      src={`http://localhost:8000/api/v1/users/user-avatar/${post.user._id}`}
                      alt={"profile"}
                      onClick={() => {
                        handleClose();
                        setProfileActive();
                      }}
                    />
                    <div className={Styles.user_info}>
                      <p className={Styles.username}>{post.user.name}</p>
                      <p className={Styles.user_designation}>Designation</p>
                    </div>
                  </div>
                  <FaTimes color="white" size="25px" onClick={handleClose} />
                </div>
                <p className={Styles.post_content}>{post.post.desc}</p>
              </div>
            </a.div>
          </IconContext.Provider>
        </ReactPortal>
      )
  );
};

export default PostModal;
