// EmailContext.js

import { createContext, useContext, useState } from "react";

const EmailContext = createContext();

export const useEmail = () => useContext(EmailContext);

export const EmailProvider = ({ children }) => {
  const [emails, setEmails] = useState([]);

  const value = {
    emails,
    setEmails,
  };

  return (
    <EmailContext.Provider value={value}>{children}</EmailContext.Provider>
  );
};
