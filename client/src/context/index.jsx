import React from "react";
import AlertContextProvider from "./alert/alertContext";
import AlumniContextProvider from "./alumni/alumniContext";
import AuthContextProvider from "./auth/authContext";
import MessageContextProvider from "./messageContext/messageContext";
import SocketContextProvider from "./socket/socketContext";

const ContextProvider = ({ children }) => {
  return (
    <AuthContextProvider>
      <AlumniContextProvider>
        <SocketContextProvider>
          <AlertContextProvider>
            <MessageContextProvider>{children}</MessageContextProvider>
          </AlertContextProvider>
        </SocketContextProvider>
      </AlumniContextProvider>
    </AuthContextProvider>
  );
};

export default ContextProvider;
