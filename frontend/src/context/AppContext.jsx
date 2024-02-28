/* eslint-disable react/prop-types */
import { GetCurrentUser } from "../api/Users";
import { ValidateToken } from "../api/Auth";
import { createContext, useContext } from "react";
import { useQuery } from "react-query";

const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {
  const { isError } = useQuery("ValidateToken", ValidateToken, {
    retry: false,
  });

  const { data: currentUser } = useQuery("GetCurrentUser", GetCurrentUser);

  return (
    <AppContext.Provider value={{ isLoggedIn: !isError, currentUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const UseAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
