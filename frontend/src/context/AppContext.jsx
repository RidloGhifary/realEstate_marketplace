/* eslint-disable react/prop-types */
import { ValidateToken } from "../api/Auth";
import { createContext, useContext } from "react";
import { useQuery } from "react-query";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const { isError } = useQuery("ValidateToken", ValidateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider value={{ isLoggedIn: !isError }}>
      {children}
    </AppContext.Provider>
  );
};

export const UseAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
