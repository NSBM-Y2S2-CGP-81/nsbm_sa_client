import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState(null);

  return (
    <AppContext.Provider value={{ globalVariable, setGlobalVariable }}>
      {children}
    </AppContext.Provider>
  );
};
