import { AlertStatus } from "lib/enum";
import React, { createContext, useContext, useState } from "react";
import { useCallback } from "react";

const initialState = {
  alert: AlertStatus.NONE,
  alertText: "",
  success: (text, timeout) => { },
  clear: () => { },
  error: () => { },
};

const AlertContext = createContext(initialState);
AlertContext.displayName = "AlertContext";

const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useState(AlertStatus.NONE);
  const [alertText, setAlertText] = useState("");
  const success = useCallback((text, timeout = 5000) => {
    setAlertText(text);
    setAlert(AlertStatus.SUCCESS);
    setTimeout(() => setAlert(AlertStatus.NONE), timeout);
  }, []);
  const failed = useCallback((text, timeout = 5000) => {
    setAlertText(text);
    setAlert(AlertStatus.FAILED);
    setTimeout(() => setAlert(AlertStatus.NONE), timeout);
  }, []);
  const error = useCallback((text, timeout = 5000) => {
    setAlertText(text);
    setAlert(AlertStatus.ERROR);
    setTimeout(() => setAlert(AlertStatus.NONE), timeout);
  }, []);

  return (
    <AlertContext.Provider
      value={{
        alert,
        alertText,
        success,
        failed,
        error,
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
