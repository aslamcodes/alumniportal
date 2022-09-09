import React, { useEffect } from "react";
import Styles from "./InexoreModal.module.css";
import ReactPortal from "components/Modal/ReactPortal";
import { IconContext } from "react-icons";
import { a, config, useTransition } from "react-spring";

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
            <a.div style={style} className={Styles.inexore_modal_overlay}>
              <div className={Styles.inexore_modal_main}>
                <div className={Styles.center}>
                  <h1> Alumni Portal version 1.1</h1>
                  <h2> Meet Our Inexore team </h2>
                </div>
                <div className={Styles.profiles}>
                  <div className={Styles.profile}>
                    <div>
                      <img
                        className={Styles.profile_img}
                        src={require("assets/Profile_images/man.png")}
                      />
                    </div>
                    <h3 className={Styles.profile_name}> Mohammed Aslam </h3>
                    <h5 className={Styles.profile_job}>Developer</h5>
                    <p> "Always remember, beginning is the hardest part"</p>
                  </div>
                  <div className={Styles.profile}>
                    <div>
                      <img
                        className={Styles.profile_img}
                        src={require("assets/Profile_images/2.png")}
                      />
                    </div>
                    <h3 className={Styles.profile_name}> Aswin G</h3>
                    <h5 className={Styles.profile_job}>Designer</h5>
                    <p>
                      "It does not matter how slowly you go as long as you do
                      not stop."
                    </p>
                  </div>
                  <div className={Styles.profile}>
                    <div>
                      <img
                        className={Styles.profile_img}
                        src={require("assets/Profile_images/3.png")}
                      />
                    </div>
                    <h3 className={Styles.profile_name}> Heemanush CP </h3>
                    <h5 className={Styles.profile_job}>Designer</h5>
                    <p>
                      "Engineering is the closest thing to magic that exists in
                      the world"
                    </p>
                  </div>
                  <div className={Styles.profile}>
                    <div>
                      <img
                        className={Styles.profile_img}
                        src={require("assets/Profile_images/4.png")}
                      />
                    </div>
                    <h3 className={Styles.profile_name}> Jayvan Andel</h3>
                    <h5 className={Styles.profile_job}>Developer</h5>
                    <p>
                      "Let your unique awesomeness and positive energy inspire
                      confidence in others."
                    </p>
                  </div>
                </div>

                {/* <img src={backgroundImage} alt="background"></img> */}
                {/* <button onClick={closemodal}>X</button> */}
              </div>
            </a.div>
          </IconContext.Provider>
        </ReactPortal>
      )
  );
};
export default InexoreModal;
