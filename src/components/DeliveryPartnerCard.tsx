import React, { useState } from "react";
import { SendItemsDetails } from "./SendItemModal";
import axios from "axios";

interface DeliveryCardProps {
  shippmentDetails: SendItemsDetails;
  setAllShippments: React.Dispatch<React.SetStateAction<SendItemsDetails[]>>;
}

const DeliveryPartnerCard = ({
  shippmentDetails,
  setAllShippments,
}: DeliveryCardProps) => {
  const editHandler = async (deliveryStatus: string) => {
    try {
      const { data, status } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/shippments/${shippmentDetails?.id}`,
        { ...shippmentDetails, status: deliveryStatus }
      );
      if (status === 200) {
        setAllShippments((previousData) => [
          ...previousData.map((shippment) =>
            shippment.id === shippmentDetails.id
              ? { ...shippment, status: deliveryStatus }
              : shippment
          ),
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const bgColor = () => {
    if (shippmentDetails.status === "Canceled") return "bg-red-100";
    if (shippmentDetails.status === "Received") return "bg-blue-100";
    if (shippmentDetails.status === "Delivered") return "bg-green-100";
    if (shippmentDetails.status === "Pending") return "bg-yellow-100";
  };

  return (
    <li
      className={`rounded min-w-[30%] justify-between p-4 px-6 flex
    ${bgColor()}
    `}
    >
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
      <div className="flex flex-col justify-between">
        <p>STATUS: {shippmentDetails.status}</p>
        <div className="flex justify-around items-center">
          <button
            className="flex hover:bg-gray-100 rounded-full px-2 py-[6px]"
            onClick={() => editHandler("Received")}
          >
            <span className="material-icons-outlined text-blue-500">
              file_download
            </span>
          </button>
          <button
            className="flex hover:bg-gray-100 rounded-full px-2 py-[6px]"
            onClick={() => editHandler("Delivered")}
          >
            <span className="material-icons-outlined text-green-500">
              task_alt
            </span>
          </button>
          <button
            className="flex hover:bg-gray-100 rounded-full px-2 py-[6px]"
            onClick={() => editHandler("Canceled")}
          >
            <span className="material-icons-outlined text-red-500">block</span>
          </button>
        </div>
      </div>
    </li>
  );
};

export { DeliveryPartnerCard };
