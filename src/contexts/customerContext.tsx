import { createContext, ReactNode, useState, useContext } from "react";
import { SendItemsDetails } from "../components/SendItemModal";

interface UserDetails {
  _id: number;
  name: string;
  profile: string;
  shippments: SendItemsDetails[];
  email: string;
}

const userContext = createContext<any>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

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
