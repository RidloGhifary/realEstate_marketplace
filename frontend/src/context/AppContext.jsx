/* eslint-disable react/prop-types */
import { GetCurrentUser } from "../api/Users";
import { ValidateToken } from "../api/Auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const { isError } = useQuery("ValidateToken", ValidateToken, {
    retry: false,
  });

  const { data: currentUser, isLoading } = useQuery(
    "GetCurrentUser",
    GetCurrentUser,
    {
      retry: false,
    },
  );

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
        currentUser: user,
        fetchUserLoading: isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const UseAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
