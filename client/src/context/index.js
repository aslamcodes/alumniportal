import React from "react";
import AlumniContextProvider from "./alumni/alumniContext";
import AuthContextProvider from "./auth/authContext";

const ContextProvider = ({ children }) => {
  return (
    <AuthContextProvider>
      <AlumniContextProvider>{children}</AlumniContextProvider>
    </AuthContextProvider>
  );
};

export default ContextProvider;
