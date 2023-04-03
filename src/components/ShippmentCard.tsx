import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/customerContext";
import { SendItemModal } from "./SendItemModal";
const ShippmentCard = ({ shippmentDetails }: any) => {
  const { setUserData } = useUser();
  const [toggleSendItemModal, setToggleSendItemModal] = useState(false);

  const handleDelete = async (shippmentId: number) => {
    const { status } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/shippments/${shippmentId}`
    );

    if (status === 200) {
      setUserData((previousData) => ({
        ...previousData,
        shippments: previousData?.shippments
          ? previousData?.shippments.filter(
              (shippment: any) => shippment.id !== shippmentId
            )
          : [],
      }));
    }
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () =>
    setToggleSendItemModal((previousVal) => !previousVal);

  return (
    <>
      <li className=" my-3 bg-gray-50  p-4 ">
        <div className="flex justify-end gap-2 mb-2 text-gray-500">
          <button onClick={handleEdit} title="Edit">
            <span className="material-icons-outlined">edit</span>
          </button>
          <button
            onClick={() => handleDelete(shippmentDetails.id)}
            title="Delete"
          >
            <span className="material-icons-outlined">delete</span>
          </button>
        </div>
        <div className="flex justify-between items-center">
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
          <div
            className={`road self-end	${
              shippmentDetails.status === "Received" ? "text-blue-400 " : ""
            } 
            ${shippmentDetails.status === "Canceled" ? "text-red-400" : ""} 
            ${
              shippmentDetails.status === "Pending" ? "text-yellow-400" : ""
            }          
            ${
              shippmentDetails.status === "Delivered" ? "text-green-400" : ""
            }        
            `}
          >
            <div
              className={`
              
             ${shippmentDetails.status === "Received" ? "ml-28" : ""} 
             ${shippmentDetails.status === "Delivered" ? "ml-[80%]" : ""} 
             ${shippmentDetails.status === "Canceled" ? "" : ""} `}
            >
              <h6 className="text-[8px] font-semibold uppercase">
                {shippmentDetails.status}
              </h6>
              <span className="material-icons-outlined ml-2">
                local_shipping
              </span>
            </div>
          </div>
          <div>
            <h6 className="text-[10px] font-medium text-gray-500">
              DROP LOCATION
            </h6>
            <p>{shippmentDetails.drop}</p>
          </div>
        </div>
      </li>
      {toggleSendItemModal ? (
        <SendItemModal
          setModal={() => handleEdit()}
          editDetails={shippmentDetails}
        />
      ) : (
        ""
      )}
    </>
  );
};

export { ShippmentCard };
