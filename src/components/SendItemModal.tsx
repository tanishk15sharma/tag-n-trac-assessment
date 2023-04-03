import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/customerContext";
export interface SendItemsDetails {
  pickup: string;
  drop: string;
  pickupDate: string;
  pickupTime: string;
  deliveryPartnerId: number | undefined;
  customerId: number;
  number: number;
  status: string;
  id?: number;
}

const SendItemModal = ({
  setModal,
  editDetails,
}: {
  setModal: () => void;
  editDetails?: SendItemsDetails;
}) => {
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const { id, phone } = JSON.parse(localStorage.getItem("userInfo") as string);
  const [deliveryPartners, setDeliveryPartners] = useState<any>([]);
  const [sendItemDetails, setSendItemDetails] = useState<SendItemsDetails>(
    editDetails
      ? editDetails
      : {
          pickup: "",
          drop: "",
          pickupDate: "",
          pickupTime: "",
          deliveryPartnerId: undefined,
          customerId: id,
          status: "Pending",
          number: phone,
        }
  );
  const captchaCharacters = "abcd1234";
  const { setUserData } = useUser();

  const generateCaptcha = () => {
    let result = "";

    for (let i = 0; i < 6; i++) {
      result += captchaCharacters.charAt(
        Math.floor(Math.random() * captchaCharacters.length)
      );
    }
    setGeneratedCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();

    (async () => {
      try {
        const { status, data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users?role=deliveryPartner`
        );
        if (status === 200) {
          console.log(data);
          return setDeliveryPartners(data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleFormInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSendItemDetails((previousData) => ({
      ...previousData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      const { status, data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/shippments`,
        sendItemDetails
      );
      if (status === 201) {
        setUserData((previousData) => ({
          ...previousData,
          shippments: previousData?.shippments
            ? [...previousData?.shippments, data]
            : [],
        }));
        return setModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const editHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      const { data, status } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/shippments/${editDetails?.id}`,
        sendItemDetails
      );
      if (status === 200) {
        setUserData((previousData) => ({
          ...previousData,
          shippments: previousData?.shippments
            ? previousData?.shippments.map((shippment) =>
                shippment.id === data.id ? (shippment = data) : shippment
              )
            : [],
        }));
        return setModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main
      onClick={() => setModal()}
      className="fixed inset-0 h-screen w-screen flex justify-center items-start z-30 bg-zinc-400"
    >
      <div
        className="bg-white px-4 min-h-[40%] max-h-[80%] overflow-auto w-7/12 min-w-96 tablet:w-8/12 mobile:w-11/12 rounded shadow-2xl mt-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          {editDetails ? (
            <h1 className="text-3xl font-semibold">Update Delivery Details</h1>
          ) : (
            <h1 className="text-3xl font-semibold">Where to deliver ?</h1>
          )}
          <h4 className="text-gray-500 text-sm">Your on demand service boy</h4>
          <form className="flex flex-col my-10">
            <label
              htmlFor="pick"
              className="text-[10px] font-semibold text-gray-400"
            >
              PICKUP LOCATION
            </label>
            <input
              type="text"
              id="pick"
              value={sendItemDetails.pickup}
              onChange={(e) => handleFormInput(e)}
              name="pickup"
              className="border py-2 rounded-md px-2"
              placeholder="Enter the location"
            />

            <label
              htmlFor="drop"
              className="text-[10px] font-semibold text-gray-400 mt-6"
            >
              DROP LOCATION
            </label>
            <input
              type="text"
              id="drop"
              value={sendItemDetails.drop}
              onChange={(e) => handleFormInput(e)}
              name="drop"
              className="border py-2 rounded-md px-2"
              placeholder="Enter the location"
            />

            <div className="flex justify-between">
              <div className="flex flex-col w-[30%] mt-2">
                <label
                  htmlFor="date"
                  className="text-[10px] font-semibold text-gray-400 mt-6"
                >
                  PICKUP DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={sendItemDetails.pickupDate}
                  onChange={(e) => handleFormInput(e)}
                  name="pickupDate"
                  className="border py-2 rounded-md px-2"
                  placeholder="Enter the location"
                />
              </div>

              <div className="flex flex-col w-[30%] mt-2">
                <label
                  htmlFor="time"
                  className="text-[10px] font-semibold text-gray-400 mt-6"
                >
                  PICKUP TIME
                </label>
                <input
                  type="time"
                  id="time"
                  value={sendItemDetails.pickupTime}
                  onChange={(e) => handleFormInput(e)}
                  name="pickupTime"
                  className="border py-2 rounded-md px-2"
                  placeholder="Enter the location"
                />
              </div>
              {editDetails ? (
                ""
              ) : (
                <div className="flex flex-col w-[30%] mt-2">
                  <label
                    htmlFor="deliveryPartner"
                    className="text-[10px] font-semibold text-gray-400 mt-6"
                  >
                    DELIVERY PARTNER
                  </label>
                  <select
                    onChange={(e) => handleFormInput(e)}
                    className="p-2 border rounded-md"
                    name="deliveryPartnerId"
                  >
                    {deliveryPartners?.map((partner: any) => (
                      <option
                        key={partner.id}
                        className={`p-2 m-2 font-medium ${
                          partner.isAvailable
                            ? "text-green-600"
                            : "text-red-600 "
                        } text-sm`}
                        disabled={!partner.isAvailable}
                        value={partner.id}
                      >
                        {partner.name},{partner.area}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex mt-8 justify-between">
              {editDetails ? (
                <button
                  type="submit"
                  className="bg-blue-400 py-2 w-[30%] px-3 font-semibold text-white"
                  onClick={(e) => editHandler(e)}
                >
                  Update Delivery
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-400 py-2 w-[30%] px-3 font-semibold text-white"
                  onClick={(e) => submitHandler(e)}
                >
                  SUBMIT
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export { SendItemModal };
