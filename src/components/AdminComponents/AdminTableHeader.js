import React from "react";
import { FiSearch } from "react-icons/fi";
import Styles from "./AdminTableHeader.module.css";

const AdminTableHeader = () => {
  return (
    <div>
      <h1>Alumni Details</h1>
      <div>
        <div className={Styles.search}>
          <FiSearch />
          <input placeholder="Search Options" />
        </div>
        <div>
          <button>Filter</button>
          <button>Insert</button>
        </div>
      </div>
      <div>
        <p>Showing 1-10 of 1000 results</p>
        Results Per Page{" "}
        <select>
          <option>1</option>
          <option>...</option>
          <option>10</option>
        </select>
      </div>
    </div>
  );
};

export default AdminTableHeader;
