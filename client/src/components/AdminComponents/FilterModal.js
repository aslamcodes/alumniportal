import ReactPortal from "components/Modal/ReactPortal";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { a, useTransition } from "react-spring";
import Styles from "./FilterModal.module.css";

const FilterModal = ({
  filters,
  isFilterModalOpen,
  handleClose,
  onApplyFilter,
}) => {
  const [selectedFilters, setSelectedFilters] = useState(
    filters
      ? Object.keys(filters).reduce(
          (acc, option) => ({
            ...acc,
            [option]: [],
          }),
          {}
        )
      : {}
  );
  const filterModalTransitions = useTransition(isFilterModalOpen, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  const handleOptionSelect = (filter, option) => {
    setSelectedFilters((prev) => {
      if (!prev[filter]) {
        return {
          ...prev,
          [filter]: [option],
        };
      }

      if (!prev[filter].includes(option))
        return {
          ...prev,
          [filter]: [...prev[filter], option],
        };

      return {
        ...prev,
        [filter]: [
          ...prev[filter]?.filter(
            (selectedOption) => option !== selectedOption
          ),
        ],
      };
    });
  };

  const handleApplyFilter = (e) => {
    onApplyFilter(selectedFilters);
    handleClose(e);
  };

  return filterModalTransitions(
    (style, item) =>
      item && (
        <ReactPortal wrapperId="filter_modal_wrapper">
          <a.div style={style} className={Styles.filter_modal_overlay}>
            <main className={Styles.filter_modal_main}>
              <div className={Styles.filter_header}>
                <FaTimes onClick={handleClose} />
                <p onClick={handleApplyFilter}>Apply</p>
              </div>
              {filters &&
                Object.keys(filters).map((filter) => (
                  <div className={Styles.filter_group}>
                    <h2 className={Styles.filter_title}>{filter}</h2>
                    <div className={Styles.filter_options}>
                      {filters[filter].map((option) => (
                        <p
                          className={`${
                            selectedFilters[filter]?.includes(option) &&
                            Styles.selected
                          }`}
                          onClick={() => {
                            handleOptionSelect(filter, option);
                          }}
                        >
                          {option}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
            </main>
          </a.div>
        </ReactPortal>
      )
  );
};

export default FilterModal;
