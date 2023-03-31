import { createContext, ReactNode, useState, useContext } from "react";

const userContext = createContext<any>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState("");

  return (
    <userContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </userContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(userContext);
  if (context === null) {
    throw new Error(
      "useProducts must be used within a ProductsContextProvider"
    );
  }
  return context;
};

export { useUser, UserContextProvider };
