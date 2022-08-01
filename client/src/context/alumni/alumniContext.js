import React, { createContext, useContext, useReducer } from "react";
import { alumniReducer, initialState } from "./alumniReducer";

const AlumniContext = createContext(initialState);
const AlumniDispatchContext = createContext();

const AlumniContextProvider = ({ children }) => {
  const [alumni, dispatch] = useReducer(alumniReducer, initialState);
  return (
    <AlumniContext.Provider value={alumni}>
      <AlumniDispatchContext.Provider value={dispatch}>
        {children}
      </AlumniDispatchContext.Provider>
    </AlumniContext.Provider>
  );
};

export const useAlumniContext = () => {
  const context = useContext(AlumniContext);

  if (!context)
    throw new Error(
      "useAlumniContext Hook must be defined within a context provider"
    );

  return context;
};

export const useAlumniDispatchContext = () => {
  const context = useContext(AlumniDispatchContext);

  if (!context)
    throw new Error(
      "useAlumniDispatchContext Hook must be defined within a context provider"
    );

  return context;
};

export default AlumniContextProvider;
