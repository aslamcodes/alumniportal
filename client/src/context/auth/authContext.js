import React, { createContext, useContext, useReducer } from "react";
import { authReducer, initialState } from "./authReducer";

const AuthContext = createContext();
const AuthDispatchContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error(
      "useAuthContext Hook must be defined within a context provider"
    );

  return context;
};

export const useAuthDispatchContext = () => {
  const context = useContext(AuthDispatchContext);

  if (!context)
    throw new Error(
      "useAuthDispatchContext Hook must be defined within a context provider"
    );

  return context;
};

export default AuthContextProvider;
