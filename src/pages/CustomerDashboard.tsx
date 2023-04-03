import React, { useState, useEffect } from "react";
import { SendItemModal } from "../components/SendItemModal";
import { ShippmentCard } from "../components/ShippmentCard";
import { useUser } from "../contexts/customerContext";
import axios from "axios";
import { Nav } from "../components/Nav";
const CustomerDashboard = () => {
  const [toggleSendItemModal, setToggleSendItemModal] = useState(false);
  const { userData, setUserData } = useUser();

  let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  useEffect(() => {
    (async () => {
      try {
        if (userInfo !== null) {
          const { status, data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/shippments?customerId=${userInfo.id}`
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
  return (
    <>
      <Nav />
      <div className="m-10 mx-20 ">
        <div className="flex items-center justify-around">
          <section className="w-[60%]">
            <h1 className="text-3xl">Shippments</h1>
            <ul>
              {userData?.shippments?.map((shippment: any, index: number) => (
                <ShippmentCard shippmentDetails={shippment} key={index} />
              ))}
            </ul>
          </section>
          <button
            className="bg-blue-400 rounded-lg hover:shadow-2xl py-2 px-3 font-semibold text-white"
            onClick={() =>
              setToggleSendItemModal((previousValue) => !previousValue)
            }
          >
            <div className="max-w-[200px] max-h-[200px]">
              <img src="/images/pickDrop.webp" alt="pick-drop" />
            </div>
            <span>PICK AND DROP</span>
          </button>
        </div>
      </div>
      {toggleSendItemModal && (
        <SendItemModal
          setModal={() => setToggleSendItemModal((previousVal) => !previousVal)}
        />
      )}
    </>
  );
};

export { CustomerDashboard };
