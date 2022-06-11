import React from "react";

const Divider = ({
  bgColor = "#d9d9d9",
  mb = "0.5em",
  mt = ".5em",
  vertical = false,
}) => {
  const style = !vertical
    ? {
        width: "100%",
        height: "1px",
      }
    : {
        width: "1px",
        height: "100%",
      };
  return (
    <div
      style={{
        backgroundColor: bgColor,
        marginBottom: mb,
        marginTop: mt,
        ...style,
      }}
    />
  );
};

export default Divider;
