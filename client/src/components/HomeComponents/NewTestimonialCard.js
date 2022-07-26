import React, { useState } from 'react'
import styles from './NewTestimonialCard.module.css'
import { BiImageAdd } from "react-icons/bi";
function NewTestimonialCard() {
  const [data, setData] = useState({
    img: undefined,
    name: "",
    quote: "",
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    }
    )
    console.log(data.img);
  }
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setData({
        ...data,
        img: data.img || undefined
      });
      return;
    }
    setData({
      ...data,
      img: e.target.files[0]
    });

  };

  return (
    <div className={styles.new_testimonial_container}>
      <div className={styles.img_container}>
        <label htmlFor="img-input">
          <BiImageAdd size="50px" />
        </label>
        <input name="image" id="img-input" type="file" onChange={onSelectFile} />
        <img src={URL.createObjectURL(data.img)} alt="upload-image" />
      </div>
      <div className={styles.input_container}>
        <label >Name</label>
        <input type="text" name="name" id="name" placeholder="Enter your name" value={data.name} onChange={handleChange} />
        <label >Quote</label>
        <input type="text" name="quote" id="quote" placeholder="Enter the quote" value={data.quote} onChange={handleChange} />
      </div>
    </div>
  )
}

export default NewTestimonialCard