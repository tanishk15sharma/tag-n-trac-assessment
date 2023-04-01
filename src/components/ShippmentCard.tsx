import React from "react";

const ShippmentCard = ({ shippmentDetails }: any) => {
  return (
    <li className=" flex my-3 bg-gray-50 justify-between p-4 items-start">
      <div>
        <h6 className="text-[10px]  font-medium text-gray-500">
          PICKUP LOCATION
        </h6>
        <p>{shippmentDetails.pickup}</p>
        <span className="text-sm text-gray-400">
          {shippmentDetails.pickupDate}
        </span>{" "}
        |
        <span className="text-sm text-gray-400">
          {shippmentDetails.pickupTime}
        </span>
      </div>
      <div className="road self-end	">
        <h6 className="text-[8px] font-semibold uppercase">
          {shippmentDetails.status}
        </h6>
        <span className="material-icons-outlined">local_shipping</span>
      </div>
      <div>
        <h6 className="text-[10px] font-medium text-gray-500">DROP LOCATION</h6>
        <p>{shippmentDetails.drop}</p>
      </div>
    </li>
  );
};

export { ShippmentCard };
