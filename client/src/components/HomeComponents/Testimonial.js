import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import React from "react";
import styles from "./Testimonial.module.css";
function Testimonial({ onDelete, quotes, name, testimonialId }) {
  const { user } = useAuthContext();

  const { fetchData, error, isLoading } = useAxiosWithCallback();

  const onTestimonialDelete = () => {
    fetchData(
      {
        method: "delete",
        url: `/api/v1/testimonial/${testimonialId}`,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      },
      (res) => {
        onDelete("Testimonial Deleted");
      }
    );
  };

  return (
    <div className={`${styles["Testimonial"]} `}>
      <div className={styles["Testimonial-content"]}>
        <div className={styles["Profile-Container"]}>
          <img src={`/api/v1/testimonial/user-image/${testimonialId}`} alt="" />
        </div>
        <div className={styles["Quotes-Container"]}>
          <div className={styles["Quotes"]}>
            <p>{quotes}</p>
          </div>
          <div className={styles["Author"]}>
            <p>- {name}</p>
          </div>
        </div>

        {user?.isAdmin && (
          <div
            onClick={onTestimonialDelete}
            className={` ${styles.testimonial_edit}`}
          >
            <img src={require("assets/icons/block.png")} alt="edit-icon" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Testimonial;
