import React from "react";
import AlertContextProvider from "./alert/alertContext";
import AlumniContextProvider from "./alumni/alumniContext";
import AuthContextProvider from "./auth/authContext";
import MessageContextProvider from "./messageContext/messageContext";

const ContextProvider = ({ children }) => {
  return (
    <AuthContextProvider>
      <AlumniContextProvider>
        <AlertContextProvider>
          <MessageContextProvider>{children}</MessageContextProvider>
        </AlertContextProvider>
      </AlumniContextProvider>
    </AuthContextProvider>
  );
};

export default ContextProvider;
