import React from "react";

const AdminSidebar = ({ expanded, onClose }) => {
  return <div>{expanded ? "Expanded" : "Nope"}</div>;
};

export default AdminSidebar;
