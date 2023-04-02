import React from "react";
import { SendItemsDetails } from "./SendItemModal";

const DeliveryPartnerCard = ({
  shippmentDetails,
}: {
  shippmentDetails: SendItemsDetails;
}) => {
  return (
    <li className="border rounded w-[30%] justify-between p-4 px-6 flex">
      <div>
        <h6 className="text-[10px] font-semibold text-gray-400">PICKUP:</h6>
        <h5 className="bg-gray-300 text-gray-600 text-sm w-fit px-1 rounded">
          {shippmentDetails.number}
        </h5>
        <h3>{shippmentDetails.pickup}</h3>
        <div className="text-sm">
          <span>{shippmentDetails.pickupDate}</span> |{" "}
          <span>{shippmentDetails.pickupTime}</span>
        </div>
        <h6 className="text-[10px] font-semibold text-gray-400 mt-5">
          DROP AT:
        </h6>
        <h3>{shippmentDetails.drop}</h3>
      </div>
      <div>
        <p>STATUS: {shippmentDetails.status}</p>
      </div>
    </li>
  );
};

export { DeliveryPartnerCard };
