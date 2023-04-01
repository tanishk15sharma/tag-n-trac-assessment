import React from "react";

const ShippmentCard = ({ shippmentDetails }: any) => {
  return (
    <li className=" my-3 bg-gray-50  p-4 ">
      <div className="flex justify-end gap-2 mb-2 text-gray-500">
        <button>
          <span className="material-icons-outlined">edit</span>
        </button>
        <button>
          <span className="material-icons-outlined">delete</span>
        </button>
      </div>
      <div className="flex justify-between items-start">
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
          <h6 className="text-[10px] font-medium text-gray-500">
            DROP LOCATION
          </h6>
          <p>{shippmentDetails.drop}</p>
        </div>
      </div>
    </li>
  );
};

export { ShippmentCard };
