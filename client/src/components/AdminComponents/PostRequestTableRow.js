import { useAlertContext } from "context/alert/alertContext";
import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { IoIosArrowDown, IoIosSend } from "react-icons/io";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import styles from "./PostRequestTableRow.module.css";

const ImageOverlay = ({ data, setIsShowImage }) => {
  return (
    <div className={styles.overlay} onClick={() => setIsShowImage(false)}>
      <img
        src={`http://localhost:8000/api/v1/forum/image/${data.postData.post.images[0]}`}
        alt="post"
        onClick={(e) => e.stopPropagation()}
      />
      <GrClose
        className={styles.close_btn}
        onClick={() => setIsShowImage(false)}
      />
    </div>
  );
};

const DescOverlay = ({ data, setIsShowDesc }) => {
  return (
    <div className={styles.overlay} onClick={() => setIsShowDesc(false)}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h4>Description</h4>
          <GrClose
            className={styles.close_btn}
            onClick={() => setIsShowDesc(false)}
          />
        </div>
        <hr />
        <p>{data.postData.post.desc}</p>
      </div>
    </div>
  );
};



function PostRequestTableRow({ data, onApproveHandler, onRejectHandler }) {
  const [isShowImage, setIsShowImage] = useState(false);
  const [isShowDesc, setIsShowDesc] = useState(false);


  const { successAlert } = useAlertContext();

  const handleEyeClick = () => {
    setIsShowImage(!isShowImage);
  };

  return (
    <tr className={styles.post_request_row}>
      <td>{data.user.registerNumber}</td>
      <td>{data.user.name}</td>
      <td>{data.postData.post.title}</td>
      <td className={styles.post_desc}>
        <p>{data.postData.post.desc}</p>
        <IoIosArrowDown
          className={styles.arrow_btn}
          onClick={() => setIsShowDesc(!isShowDesc)}
        />
      </td>

      <td className={styles.post_img_eye_btn}>
        {isShowImage ? (
          <IoEyeSharp fontSize={20} onClick={handleEyeClick} />
        ) : (
          <IoEyeOffSharp fontSize={20} onClick={handleEyeClick} />
        )}
      </td>

      <td className={styles.actions}>
        {!data.postData.isApproved ? (
          <>
            <p
              onClick={() => {
                onApproveHandler(data._id);
                successAlert("Approved");
              }}
              className={styles.accept}
            >
              Approve
            </p>
            <p
              className={styles.decline}
              onClick={() => {
                onRejectHandler(data._id);
              }}
            >
              Decline
            </p>
          </>
        ) : (
          `Approved by ${data.approvedBy.name}`
        )}
        {isShowImage && (
          <ImageOverlay data={data} setIsShowImage={setIsShowImage} />
        )}
        {isShowDesc && (
          <DescOverlay data={data} setIsShowDesc={setIsShowDesc} />
        )}

      </td>
    </tr>
  );
}

export default PostRequestTableRow;
