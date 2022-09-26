import React, { useState } from "react";
import {
  useSpring,
  useTransition,
  a,
  config,
  useChain,
  useSpringRef,
} from "react-spring";
import styles from "./OfficeBearerCard.module.css";

const OfficeBearerCard = ({ alumni, onAlumniClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const expandRef = useSpringRef();
  const userInfoRef = useSpringRef();

  const containerProps = useSpring({
    ref: expandRef,
    from: {
      // transform: "scale(1)",
      width: "10rem",
      height: "10rem",
    },
    to: {
      // transform: isHovered ? "scale(1.2)" : "scale(1)",
      width: isHovered ? "15rem" : "10rem",
      height: isHovered ? "15rem" : "10rem",
    },
  });

  const gradientTransition = useTransition(isHovered, {
    ref: userInfoRef,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const userInfoTransitions = useTransition(isHovered, {
    ref: userInfoRef,
    from: { opacity: 0, transform: "translateY(100%)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(100%)" },
  });

  useChain([expandRef, userInfoRef]);

  return (
    <a.div
      style={containerProps}
      className={styles.office_bearer_card}
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseOut={() => {
        setIsHovered(false);
      }}
      onClick={() => onAlumniClick(alumni)}
    >
      <img
        src={`http://localhost:8000/api/v1/users/user-avatar/${alumni.user._id}`}
        alt="office bearer"
        onClick={() => {}}
      />
      {gradientTransition((props, item) => {
        return item && <a.div className={styles.card_overlay} style={props} />;
      })}

      {userInfoTransitions((props, item) => {
        return (
          item && (
            <a.div className={styles.user_info} style={props}>
              <p>
                {alumni.user.name}{" "}
                {alumni?.designation && `- ${alumni?.designation}`}
              </p>
              {alumni.organization && <p>{alumni.organization}</p>}
            </a.div>
          )
        );
      })}
    </a.div>
  );
};

export default OfficeBearerCard;
