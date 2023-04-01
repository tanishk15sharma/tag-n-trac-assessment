import axios from "axios";

import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import { SendItemsDetails } from "../components/SendItemModal";

interface UserDetails {
  shippments: SendItemsDetails[];
}

const userContext = createContext<{
  userData: UserDetails | null;
  setUserData: React.Dispatch<React.SetStateAction<UserDetails | null>>;
} | null>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserDetails | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { id } = JSON.parse(localStorage.getItem("userInfo") as string);

        const { status, data } = await axios.get(
          `http://localhost:3000/shippments?customerId=${id}`
        );
        if (status === 200) {
          setUserData((previousData) => ({
            ...previousData,
            shippments: data,
          }));
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  console.log(userData);

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
