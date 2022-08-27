import ReactPortal from "components/Modal/ReactPortal";
import React, { useEffect } from "react";
import { a, useTransition } from "react-spring";
import Styles from "./FilterModal.module.css";

const FilterModal = ({ filters, isFilterModalOpen, handleClose }) => {
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

  return filterModalTransitions(
    (style, item) =>
      item && (
        <ReactPortal wrapperId="filter_modal_wrapper">
          <a.div
            style={style}
            className={Styles.filter_modal_overlay}
            onClick={handleClose}
          >
            <main className={Styles.filter_modal_main}>
              {filters &&
                Object.keys(filters).map((filter) => (
                  <div className={Styles.filter_group}>
                    <h2 className={Styles.filter_header}>{filter}</h2>
                    <div className={Styles.filter_options}>
                      {filters[filter].map((option) => (
                        <p>{option}</p>
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
