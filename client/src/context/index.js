import React from "react";
import AuthContextProvider from "./auth/authContext";

const ContextProvider = ({ children }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default ContextProvider;
