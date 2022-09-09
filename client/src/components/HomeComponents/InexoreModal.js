import React, { useEffect } from "react";
import Styles from "./InexoreModal.module.css";
import ReactPortal from "components/Modal/ReactPortal";
import { IconContext } from "react-icons";
import { a, config, useTransition } from "react-spring";
import { GrClose } from "react-icons/gr";

const MEMBERS = [
  {
    img: (
      <img
        className={Styles.profile_img}
        src={require(`assets/Profile_images/man.png`)}
      />
    ),
    name: "Mohammed Aslam",
    designation: "Developer",
    quote: "Always remember, beginning is the hardest part",
  },
  {
    img: (
      <img
        className={Styles.profile_img}
        src={require(`assets/Profile_images/man.png`)}
      />
    ),
    name: "Aswin",
    designation: "Developer",
    quote: "Always remember, beginning is the hardest part",
  },
  {
    img: (
      <img
        className={Styles.profile_img}
        src={require(`assets/Profile_images/man.png`)}
      />
    ),
    name: "Heemanush",
    designation: "Developer",
    quote: "Always remember, beginning is the hardest part",
  },
  {
    img: (
      <img
        className={Styles.profile_img}
        src={require(`assets/Profile_images/man.png`)}
      />
    ),
    name: "Jayvan Andel",
    designation: "Developer",
    quote: "Always remember, beginning is the hardest part",
  },
];

const InexoreModal = ({ closemodal, isOpen, post }) => {
  const InexoreModalTransitions = useTransition(isOpen, {
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
    document.title = "Alumni Portal | Inexore";
  });

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? closemodal() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [closemodal]);

  return InexoreModalTransitions(
    (style, item) =>
      item && (
        <ReactPortal wrapperId="post_content_wrapper">
          <IconContext.Provider
            value={{
              color: "black",
              className: "react-icons",
            }}
          >
            <a.div
              style={style}
              className={Styles.inexore_modal_overlay}
              onClick={closemodal}
            >
              <div
                className={Styles.inexore_modal_main}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={Styles.center}>
                  <h1> Alumni Portal version 1.1</h1>
                  <h2> Meet Our Inexore team </h2>
                </div>
                <div className={Styles.profiles}>
                  {MEMBERS.map((member) => {
                    return (
                      <div className={Styles.profile}>
                        <div>{member.img}</div>
                        <h3 className={Styles.profile_name}>{member.name}</h3>
                        <h5 className={Styles.profile_job}>
                          {member.designation}
                        </h5>
                        <p> {member.quote}</p>
                      </div>
                    );
                  })}
                </div>
                <GrClose
                  className={Styles.close_btn}
                  fontSize={20}
                  onClick={closemodal}
                />
              </div>
            </a.div>
          </IconContext.Provider>
        </ReactPortal>
      )
  );
};
export default InexoreModal;
