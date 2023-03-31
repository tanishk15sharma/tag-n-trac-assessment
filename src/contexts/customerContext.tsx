import { createContext, ReactNode, useState, useContext } from "react";
import { SendItemsDetails } from "../components/SendItemModal";

interface UserDetails {
  _id: number;
  name: string;
  profile: string;
  shippments: SendItemsDetails[];
  email: string;
}

const userContext = createContext<{
  userDetails: UserDetails | null;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails | null>>;
} | null>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  console.log(userDetails);
  return (
    <userContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </userContext.Provider>
  );
};
const useUser = () => {
  const context = useContext(userContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};

export { useUser, UserContextProvider };
