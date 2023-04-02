import axios from "axios";
import React, { useState, useEffect } from "react";
import { SendItemsDetails } from "../components/SendItemModal";
import { DeliveryPartnerCard } from "../components/DeliveryPartnerCard";

const DeliveryPartnerDashboard = () => {
  const [shippmentsAssigned, setShippmentsAssigned] = useState<
    SendItemsDetails[]
  >([]);
  const [sortingName, setSortingName] = useState<string>("");
  const { id } = JSON.parse(localStorage.getItem("userInfo") as string);

  useEffect(() => {
    (async () => {
      try {
        const { status, data } = await axios.get(
          `http://localhost:3000/shippments?deliveryPartnerId=${id}`
        );
        if (status === 200) {
          setShippmentsAssigned(data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const sortedShippments = shippmentsAssigned.filter((shippment) =>
    sortingName ? shippment.status === sortingName : shippment
  );

  return (
    <>
      <div className="m-10 mx-20 ">
        <div className="flex justify-between my-10">
          <h1 className="text-3xl">Remaining Shippments</h1>
          <div className="">
            <select
              onChange={(e) => setSortingName(e.target.value)}
              className="p-2 border rounded-md w-[160px]"
              name="deliveryPartnerId"
            >
              <option value="" selected>
                All
              </option>
              <option value="Pending">Pending</option>
              <option value="Recived">Recived</option>
              <option value="Canceled">Canceled</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
        <ul className="flex gap-6 py-4">
          {sortedShippments.map((shippment) => (
            <DeliveryPartnerCard
              setAllShippments={setShippmentsAssigned}
              shippmentDetails={shippment}
              key={shippment.id}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export { DeliveryPartnerDashboard };