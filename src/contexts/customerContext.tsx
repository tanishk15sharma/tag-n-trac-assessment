import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { SendItemsDetails } from "../components/SendItemModal";

interface UserDetails {
  shippments?: SendItemsDetails[];
}

const userContext = createContext<{
  userData: UserDetails | null;
  setUserData: React.Dispatch<React.SetStateAction<UserDetails | null>>;
} | null>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserDetails | null>({
    shippments: [],
  });

  const value = useMemo(() => ({ userData, setUserData }), [userData]);
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
const useUser = () => {
  const context = useContext(userContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};

export { useUser, UserContextProvider };
