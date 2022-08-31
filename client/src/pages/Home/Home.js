import React, { useState } from "react";
import Carousel from "components/UI/Carousel";
import styles from "./Home.module.css";
import NewTestimonialCard from "components/HomeComponents/NewTestimonialCard";
import { useAuthContext } from "context/auth/authContext";
import useGetTestimonial from "hooks/useGetTestimonial";
import video from 'assets/test/skctvideo60fps.mp4';

const Home = () => {
  const [newTestimonialActive, setNewTestimonialActive] = useState(false);
  const { user } = useAuthContext();
  const { testimonials, error, isLoading, trigger } = useGetTestimonial();

  const onChangeTestimonial = (message) => {
    trigger();
    alert(message);
    setNewTestimonialActive(false);
  };

  return (
    <div className={`${styles.Body} `}>
      <div className={styles["Content-Container"]}>
        <div id={styles["Welcome"]}>
          <video className={styles.video} src={video} width="100" height="100" loop autoPlay muted />
          <div className={styles.video_overlay} />
          <div className={`${styles.Container}`}>
            <h1>
              Welcome <span>Back</span>
            </h1>
            <p>
              I think the success of any school can be measured by the
              contribution the alumni make to our national life
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
