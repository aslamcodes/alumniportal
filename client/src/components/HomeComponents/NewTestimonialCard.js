import React, { useState } from "react";
import styles from "./NewTestimonialCard.module.css";
import { BiImageAdd } from "react-icons/bi";
import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";

function NewTestimonialCard({ active, onNewTestimonial }) {
  const [testimonialData, setTestimonialData] = useState({
    img: null,
    name: "",
    quote: "",
  });

  const { user } = useAuthContext();
  const { fetchData, error, isLoading } = useAxiosWithCallback();

  const handleChange = (e) => {
    setTestimonialData({
      ...testimonialData,
      [e.target.name]: e.target.value,
    });
  };

  const onSelectFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) return;

    setTestimonialData({
      ...testimonialData,
      img: event.target.files[0],
    });
  };

  const onAddNewTestimonial = () => {
    const formData = new FormData();
    formData.append("name", testimonialData.name);
    formData.append("quote", testimonialData.quote);
    formData.append("image", testimonialData.img);

    const testimonialConfig = {
      url: "/api/v1/testimonial/",
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user?.token}`,
      },
    };

    fetchData(testimonialConfig, (res) => {
      onNewTestimonial("New Testimonial Created");
    });
  };

  return (
    <div
      className={`${styles.new_testimonial_container} ${
        active && styles.new_testimonial_container_active
      }`}
    >
      <div className={`${styles.img_container} ${active && styles.active}`}>
        <label htmlFor="img-input">
          <BiImageAdd size="50px" />
        </label>
        <input
          name="image"
          id="img-input"
          type="file"
          onChange={onSelectFile}
        />

        {testimonialData.img && (
          <img src={URL.createObjectURL(testimonialData.img)} alt="upload" />
        )}
      </div>
      <div className={styles.input_container}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          value={testimonialData.name}
          onChange={handleChange}
        />
        <label>Quote</label>
        <input
          type="text"
          name="quote"
          id="quote"
          placeholder="Enter the quote"
          value={testimonialData.quote}
          onChange={handleChange}
        />
        <button onClick={onAddNewTestimonial}>Add</button>
      </div>
    </div>
  );
}

export default NewTestimonialCard;
