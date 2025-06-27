import React, { createContext, useEffect, useState } from "react";

export const loginContext = createContext();

const LoginContext = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [isLoggedIn]);
  return <loginContext.Provider value={{isLoggedIn, setLoggedIn}}>{children}</loginContext.Provider>;
};

export default LoginContext;
