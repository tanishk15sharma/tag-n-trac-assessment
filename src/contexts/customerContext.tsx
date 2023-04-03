import axios from "axios";

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

  let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

  useEffect(() => {
    (async () => {
      try {
        if (userInfo !== null) {
          const { status, data } = await axios.get(
            `http://localhost:3000/shippments?customerId=${userInfo.id}`
          );
          if (status === 200) {
            setUserData((previousData) => ({
              ...previousData,
              shippments: data,
            }));
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  console.log(userData);
  // const value = useMemo(() => ({ userData, setUserData }), [userData]);
  return (
    <userContext.Provider value={{ userData, setUserData }}>
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
