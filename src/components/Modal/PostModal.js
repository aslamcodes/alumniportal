import React, { useEffect } from "react";
import { IconContext } from "react-icons";
import { GrClose } from "react-icons/gr";
import ReactPortal from "../ReactPortal";
import Styles from "./PostModal.module.css";

const PostModal = ({ handleClose, isOpen }) => {
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <ReactPortal wrapperId="post_content_wrapper">
      <IconContext.Provider value={{ color: "#ffffff" }}>
        <div className={Styles.post_modal_overlay}>
          <div className={Styles.post_modal_main}>
            <div className={Styles.post_header}>
              <div className={Styles.user_info_container}>
                <img
                  className={Styles.profile_image}
                  src={"https://picsum.photos/536/354"}
                />
                <div className={Styles.user_info}>
                  <p className={Styles.username}>username</p>
                  <p className={Styles.user_designation}>Designation</p>
                </div>
              </div>
              <GrClose
                style={{
                  color: "white",
                }}
                onClick={handleClose}
              />
            </div>
            <p className={Styles.post_content}>
              Lorem Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum. View
              MoreLorem Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum. View
              MoreLorem Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum. View
              MoreLorem Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum. View More
            </p>
          </div>
        </div>
      </IconContext.Provider>
    </ReactPortal>
  );
};

export default PostModal;
