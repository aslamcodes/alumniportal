import React from "react";
import Styles from "./Divider.module.css";
const Divider = ({ bgColor, mb, mt }) => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        marginBottom: mb,
        marginTop: mt,
      }}
      className={`${Styles.divider_base}`}
    />
  );
};

export default Divider;
