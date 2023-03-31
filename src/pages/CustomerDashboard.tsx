import React, { useState } from "react";
import { SendItemModal } from "../components/SendItemModal";

const CustomerDashboard = () => {
  const [toggleSendItemModal, setToggleSendItemModal] = useState(false);
  return (
    <div className="m-10 mx-20 ">
      <button
        className="bg-blue-400 py-2 px-3 font-semibold text-white"
        onClick={() =>
          setToggleSendItemModal((previousValue) => !previousValue)
        }
      >
        PICK AND DROP
      </button>
      {toggleSendItemModal && (
        <SendItemModal setModal={setToggleSendItemModal} />
      )}
    </div>
  );
};

export { CustomerDashboard };
