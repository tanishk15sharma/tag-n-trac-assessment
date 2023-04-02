import axios from "axios";
import React, { useState, useEffect } from "react";
import { SendItemsDetails } from "../components/SendItemModal";
import { DeliveryPartnerCard } from "../components/DeliveryPartnerCard";

const DeliveryPartnerDashboard = () => {
  const [shippmentsAssigned, setShippmentsAssigned] = useState<
    SendItemsDetails[]
  >([]);
  const { id } = JSON.parse(localStorage.getItem("userInfo") as string);
  console.log(id);
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
  console.log(shippmentsAssigned);

  return (
    <>
      <div className="m-10 mx-20 ">
        <h1 className="text-3xl">Remaining Shippments</h1>
        <ul className="flex gap-6 py-4">
          {shippmentsAssigned.map((shippment) => (
            <DeliveryPartnerCard
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
