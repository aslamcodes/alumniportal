import React from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Styles from "./Pagination.module.css";

const Pagination = ({
  currentPage = 0,
  onChange = () => {},
  onIncrease = () => {},
  onDecrease = () => {},
  totalPages = 10,
}) => {
  return (
    <div className={Styles.page_changer}>
      <FaChevronLeft onClick={onDecrease} />
      <div className={Styles.pagination_dots}>{currentPage - 1}</div>
      <div className={Styles.pagination_dots}>{currentPage}</div>
      <div className={Styles.pagination_dots}>{currentPage + 1}</div>
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
