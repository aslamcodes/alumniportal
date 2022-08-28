import Divider from "components/UI/Divider";
import React from "react";
import Styles from "./AlumnusCard.module.css";

const AlumnusCard = ({ alumnus }) => {
  console.log(alumnus);
  return (
    <div className={Styles.profile_card}>
      <img
        alt={"profile"}
        className={Styles.user_profile}
        src={`/api/v1/users/user-avatar/${alumnus.user._id}`}
      />
      <div className={Styles.user_info_container}>
        <h3>
          {alumnus.user.name}{" "}
          <span>
            {alumnus.user.department}{" "}
            {new Date(alumnus.user.yearOfPassing).getFullYear()}
          </span>
        </h3>
        <Divider />
        <p>
          {alumnus.designation} at {alumnus.organization}
        </p>
        <p>{alumnus.user.city}</p>
      </div>
      <button className={Styles.message_button}>Message</button>
    </div>
  );
};

export default AlumnusCard;
