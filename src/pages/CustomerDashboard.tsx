import React, { useState } from "react";
import { SendItemModal } from "../components/SendItemModal";
import { ShippmentCard } from "../components/ShippmentCard";
import { useUser } from "../contexts/customerContext";

const CustomerDashboard = () => {
  const [toggleSendItemModal, setToggleSendItemModal] = useState(false);
  const { userData } = useUser();
  return (
    <>
      <div className="m-10 mx-20 ">
        <div className="flex items-start">
          <section className="w-[60%]">
            <h1 className="text-3xl">Shippments</h1>
            <ul>
              {userData?.shippments?.map((shippment: any, index: number) => (
                <ShippmentCard shippmentDetails={shippment} key={index} />
              ))}
            </ul>
          </section>
          <button
            className="bg-blue-400 py-2 px-3 font-semibold text-white"
            onClick={() =>
              setToggleSendItemModal((previousValue) => !previousValue)
            }
          >
            PICK AND DROP
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
