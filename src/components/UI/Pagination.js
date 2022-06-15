import React from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Styles from "./Pagination.module.css";

const Pagination = ({
  currentPage = 2,
  onChange = () => {},
  onIncrease = () => {},
  onDecrease = () => {},
  totalPages = 10,
}) => {
  const pages = Array.from(Array(totalPages).keys(), (ele) => ele + 1);

  return (
    <div className={Styles.page_changer}>
      <FaChevronLeft onClick={onDecrease} />
      {pages[currentPage - 1] !== 1 && (
        <div onClick={onDecrease} className={Styles.pagination_dots}>
          {pages[currentPage - 2]}
        </div>
      )}
      <div className={`${Styles.pagination_dots} ${Styles.current}`}>
        {pages[currentPage - 1]}
      </div>
      {pages[currentPage - 1] !== totalPages && (
        <div onClick={onIncrease} className={Styles.pagination_dots}>
          {pages[currentPage]}
        </div>
      )}
      <FaChevronRight onClick={onIncrease} />
    </div>
  );
};

export default Pagination;
