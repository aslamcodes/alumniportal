import React, { useState } from 'react'
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5';
import styles from "./PostRequestTableRow.module.css";
function PostRequestTableRow({ data, onApproveHandler }) {
  const [isShowImage, setIsShowImage] = useState(false);
  const handleEyeClick = () => {
    setIsShowImage(!isShowImage);
  }
  return (
    <tr className={styles.post_request_row}>
      <td>{data.user.registerNumber}</td>
      <td>{data.user.name}</td>
      <td>{data.postData.post.title}</td>
      <td className={styles.post_desc}>{data.postData.post.desc}</td>

      <td className={styles.post_img_eye_btn}>{isShowImage ? <IoEyeSharp fontSize={20} onClick={handleEyeClick} /> : <IoEyeOffSharp fontSize={20} onClick={handleEyeClick} />}</td>

      <td className={styles.actions}>
        {!data.postData.isApproved ? (
          <>
            <p onClick={() => { onApproveHandler(data._id); alert("Approved") }} className={styles.accept}>
              Approve
            </p>
            <p className={styles.decline}>
              Decline
            </p>
          </>
        ) : `Approved by ${data.approvedBy.name}`}

      </td>

    </tr>
  )
}

export default PostRequestTableRow