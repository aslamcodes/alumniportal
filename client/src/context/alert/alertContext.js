import { AlertStatus } from "lib/enum";
import React, { createContext, useContext, useState } from "react";

const initialState = {
  alert: AlertStatus.NONE,
  alertText: "Hello",
  success: (text, timeout) => {},
  clear: () => {},
};

const AlertContext = createContext(initialState);
AlertContext.displayName = "AlertContext";

const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useState(AlertStatus.NONE);
  const [alertText, setAlertText] = useState("");
  return (
    <AlertContext.Provider
      value={{
        alert,
        alertText,
        success: (text, timeout) => {
          setAlertText(text);
          setAlert(AlertStatus.SUCCESS);
        },
        error: (text, timeout) => {
          setAlertText(text);
          setAlert(AlertStatus.ERROR);
        },
        clear: () => setAlert(AlertStatus.NONE),
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const context = useContext(AlertContext);

  if (!context)
    throw new Error(
      "useAlertContext Hook must be defined within a context provider"
    );

  return context;
};

export default AlertContextProvider;
