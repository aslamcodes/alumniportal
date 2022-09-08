import React, { useState, useEffect } from "react";
import Carousel from "components/UI/Carousel";
import styles from "./Home.module.css";
import NewTestimonialCard from "components/HomeComponents/NewTestimonialCard";
import { useAuthContext } from "context/auth/authContext";
import useGetTestimonial from "hooks/useGetTestimonial";
import { useAlertContext } from "context/alert/alertContext";
import video from "assets/test/skctvideo60fps.mp4";

const Home = () => {
  // Safari 3.0+ "[object HTMLElementConstructor]"
  // https://www.querythreads.com/browser-detection-in-react-js/
  const isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(
      !window["safari"] ||
      (typeof safari !== "undefined" && window["safari"].pushNotification)
    );

  useEffect(() => {
    document.title = "Alumni Portal | Home";
  }, []);
  const [newTestimonialActive, setNewTestimonialActive] = useState(false);
  const { user } = useAuthContext();
  const { testimonials, error, isLoading, trigger } = useGetTestimonial();
  const { successAlert, errorAlert } = useAlertContext();

  const onChangeTestimonial = (message) => {
    trigger();
    successAlert(message);
    setNewTestimonialActive(false);
  };

  return (
    <div className={`${styles.Body} `}>
      <div className={styles["Content-Container"]}>
        <div id={styles["Welcome"]}>
          {isSafari ? (
            <img
              className={styles.video}
              src={video}
              width="100"
              height="100"
              loop
              autoPlay
              muted
              alt={"video"}
            />
          ) : (
            <video
              className={styles.video}
              src={video}
              width="100"
              height="100"
              loop
              autoPlay
              muted
            />
          )}
          <div className={styles.video_overlay} />
          <div className={`${styles.Container}`}>
            <h1>
              Welcome <span>Back</span>
            </h1>
            <p>
              There is nothing like returning to a place that remains unchanged
              to find the ways in which you yourself have altered
            </p>
          </div>
        </div>

        {/* <div id={styles["Testimonials"]}>
          <div className={`${styles.Container}`}>
            <Carousel
              testimonials={testimonials}
              onDelete={onChangeTestimonial}
            />
            <img
              src={require("assets/testimonial.png")}
              alt="testimonial-img"
            />
            {user?.isAdmin && (
              <button
                className={`${styles.new_testimonial_btn} ${newTestimonialActive && styles.active
                  }`}
                onClick={() => setNewTestimonialActive(!newTestimonialActive)}
              >
                New Testimonial <span>+</span>
              </button>
            )}

            <NewTestimonialCard
              active={newTestimonialActive}
              onNewTestimonial={onChangeTestimonial}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
