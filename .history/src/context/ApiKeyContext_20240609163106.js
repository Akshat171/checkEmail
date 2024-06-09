import React, { createContext, useState, useContext } from "react";

const ApiKeyContext = createContext();

export const ApiKeyProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState("");

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error("useApiKey must be used within an ApiKeyProvider");
  }
  return context;
};
