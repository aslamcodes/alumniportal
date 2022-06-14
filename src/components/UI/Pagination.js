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
        <div className={Styles.pagination_dots}>{pages[currentPage - 2]}</div>
      )}
      <div className={`${Styles.pagination_dots} ${Styles.current}`}>
        {pages[currentPage - 1]}
      </div>
      {pages[currentPage - 1] !== totalPages && (
        <div className={Styles.pagination_dots}>{pages[currentPage]}</div>
      )}
      <FaChevronRight onClick={onIncrease} />
    </div>
  );
};

export default Pagination;

const getSelectStyles = () => ({
  control: (base) => ({
    ...base,
    borderRadius: ".3rem",
    padding: ".1em",
    width: "2.5rem",
  }),
  menu: (base) => ({
    ...base,
    background: "#fff",
    color: "#000",
  }),
  option: (base) => ({
    ...base,
    color: "#000",
  }),
  placeholder: (base) => ({ ...base }),
  menuList: (base) => ({
    ...base,
  }),
  singleValue: (base, state) => ({
    ...base,
    color: "#000",
  }),
  multiValue: (base, state) => ({
    ...base,
    backgroundColor: "#fff",
    color: "#000",
  }),
  multiValueLabel: (base, state) => ({
    ...base,
    color: "#000",
  }),
});

const getOptionsPagination = (totalPages) => {
  return Array.from(Array(totalPages).keys()).map((ele) => ({
    label: ele + 1,
    id: ele + 1,
  }));
};
