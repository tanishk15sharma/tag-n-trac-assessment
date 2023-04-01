import React, { useState } from "react";
import { SendItemModal } from "../components/SendItemModal";
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
                <li
                  className=" flex my-3 bg-gray-50 justify-between p-4 items-start"
                  key={index}
                >
                  <div>
                    <h6 className="text-[10px]  font-medium text-gray-500">
                      PICKUP LOCATION
                    </h6>
                    <p>{shippment.pickup}</p>
                    <span className="text-sm text-gray-400">
                      {shippment.pickupDate}
                    </span>{" "}
                    |
                    <span className="text-sm text-gray-400">
                      {shippment.pickupTime}
                    </span>
                  </div>
                  <div className="road self-end	">
                    <h6 className="text-[8px] font-semibold uppercase">
                      {shippment.status}
                    </h6>
                    <span className="material-icons-outlined">
                      local_shipping
                    </span>
                  </div>
                  <div>
                    <h6 className="text-[10px] font-medium text-gray-500">
                      DROP LOCATION
                    </h6>
                    <p>{shippment.drop}</p>
                  </div>
                </li>
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
