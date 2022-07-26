import React, { useState } from "react";
import styles from "./CustomSelect.module.css";
import { GoChevronDown } from "react-icons/go";
export const CustomSelect = ({ selected, setSelected, Items }) => {
  const [isActive, setIsActive] = useState(false);
  const options = Items;

  const SelectClickHandler = (option) => {
    setSelected(option);
    setIsActive(!isActive);
  };
  return (
    <div className={styles["dropdown"]}>
      <div
        className={styles["dropdown-btn"]}
        onClick={() => setIsActive(!isActive)}
      >
        <p className={styles["dropdown-title"]}>{selected}</p>
        <GoChevronDown />
      </div>
      {isActive && (
        <div className={styles["dropdown-content"]}>
          {options.map((option) => {
            return (
              <div
                onClick={() => SelectClickHandler(option)}
                className={styles["dropdown-item"]}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
