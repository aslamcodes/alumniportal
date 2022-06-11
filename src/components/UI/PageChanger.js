import React from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Styles from "./PageChanger.module.css";
const PageChanger = ({
  currentPage = 0,
  onChange = () => {},
  onIncrease = () => {},
  onDecrease = () => {},
  totalPages = 10,
  ...props
}) => {
  return (
    <div className={Styles.page_changer}>
      <FaChevronLeft onClick={onDecrease} />
      Previous
      <input
        min={1}
        type={"number"}
        value={currentPage}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        {...props}
        style={{ width: "100px" }}
      />
      out of
      {totalPages}
      Next
      <FaChevronRight onClick={onIncrease} />
    </div>
  );
};

export default PageChanger;
