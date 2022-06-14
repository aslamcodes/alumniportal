import Divider from "components/UI/Divider";
import React from "react";
import { FaFilter, FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Styles from "./AdminTableHeader.module.css";

const AdminTableHeader = () => {
  return (
    <>
      <p className={Styles.table_header}>Alumni Details</p>
      <Divider mb={5} mt={0} />
      <div className={Styles.table_controls}>
        <div className={Styles.search}>
          <FiSearch />
          <input placeholder="Search Options" />
        </div>
        <div className={Styles.table_actions}>
          <button>
            Filter <FaFilter />
          </button>
          <button>
            Insert
            <FaPlus />
          </button>
        </div>
      </div>
      <Divider mt={5} mb={-3} />
      <div className={Styles.table_info_handler}>
        <p className={Styles.no_of_results}>Showing 1-10 of 1000 results</p>
        <div className={Styles.results_count_changer}>
          <span>Results Per Page </span>
          <select>
            <option>1</option>
            <option>...</option>
            <option>10</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default AdminTableHeader;
