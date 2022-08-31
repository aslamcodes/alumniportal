import React from "react";
import AlertContextProvider from "./alert/alertContext";
import AlumniContextProvider from "./alumni/alumniContext";
import AuthContextProvider from "./auth/authContext";

const ContextProvider = ({ children }) => {
  return (
    <AuthContextProvider>
      <AlumniContextProvider>
        <AlertContextProvider>{children}</AlertContextProvider>
      </AlumniContextProvider>
    </AuthContextProvider>
  );
};

export default ContextProvider;
