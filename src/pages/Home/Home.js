import React from "react";
import Testimonial from "components/HomeComponents/Testimonial";
import Carousel from "components/UI/Carousel";
import styles from "./Home.module.css";

const Home = () => {

  //testData:
  const testData = [
    {
      quotes: "I am a test quote1",
      children: <img src="https://via.placeholder.com/150" alt="test" />,
      name: "Mr.Jesso Clarence.M Engineering Manager, Akamai Technology, Bangalore Batch: 2006-2010"
    },
    {
      quotes: "I am a test quote2",
      children: <img src="https://via.placeholder.com/150" alt="test" />,
      name: "Mr.Jesso Clarence.M Engineering Manager, Akamai Technology, Bangalore Batch: 2006-2010"
    },
    {
      quotes: "I am a test quote3",
      children: <img src="https://via.placeholder.com/150" alt="test" />,
      name: "Mr.Jesso Clarence.M Engineering Manager, Akamai Technology, Bangalore Batch: 2006-2010"
    },
    // {
    //   quotes: "I am a test quote4",
    //   children: <img src="https://via.placeholder.com/150" alt="test" />,
    //   name: "Mr.Jesso Clarence.M Engineering Manager, Akamai Technology, Bangalore Batch: 2006-2010"
    // }

  ]

  return (
    <div className={`${styles.Body} `}>
      <div className={styles["Content-Container"]}>
        <div id={styles["Welcome"]}>
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

        <div id={styles["Testimonials"]}>
          <div className={`${styles.Container}`}>
            <Carousel data={testData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
