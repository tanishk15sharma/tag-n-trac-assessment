import React, { useEffect, useState } from "react";

const SendItemModal = ({ setModal }: any) => {
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const captchaCharacters = "abcd1234";

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
  }, []);

  return (
    <main
      onClick={() => setModal((preVal: any) => !preVal)}
      className="fixed inset-0 h-screen w-screen flex justify-center items-start z-30 bg-zinc-500"
    >
      <div
        className="bg-white px-4 min-h-[40%] max-h-[80%] overflow-auto w-7/12 min-w-96 tablet:w-8/12 mobile:w-11/12 rounded shadow-2xl mt-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <h1 className="text-3xl font-semibold">Where to deliver ?</h1>
          <h4 className="text-gray-500 text-sm">Your on demand service boy</h4>
          <form action="" className="flex flex-col my-10">
            <label
              htmlFor="pick"
              className="text-[10px] font-semibold text-gray-400"
            >
              PICKUP LOCATION
            </label>
            <input
              type="text"
              id="pick"
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
                  className="border py-2 rounded-md px-2"
                  placeholder="Enter the location"
                />
              </div>
              <div className="flex flex-col w-[30%] mt-2">
                <label
                  htmlFor="deliveryPartner"
                  className="text-[10px] font-semibold text-gray-400 mt-6"
                >
                  DELIVERY PARTNER
                </label>
                <select
                  id="deliveryPartner"
                  className="p-2 border rounded-md"
                  name="partner"
                >
                  <option className="p-2 m-2" value="tansihk1">
                    tansihk1
                  </option>
                  <option className="p-2 m-2" value="tansihk2">
                    tansihk2
                  </option>
                  <option className="p-2 m-2" value="tansihk3">
                    tansihk3
                  </option>
                  <option className="p-2 m-2" value="tansihk4">
                    tansihk4
                  </option>
                </select>
              </div>
            </div>

            <div className="flex mt-8 justify-between">
              <div className="flex">
                <div className="flex gap-2 items-center">
                  <div
                    className="
                  
                  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-300
                  px-8 py-2 line-through font-semibold	tracking-widest	"
                  >
                    {generatedCaptcha}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      generateCaptcha();
                    }}
                  >
                    <span className="material-icons-outlined dark:text-white">
                      sync
                    </span>
                  </button>
                </div>
                <input
                  // value={captchaInput}
                  // onChange={(e) => setCaptchInput(e.target.value)}
                  placeholder="Enter CAPTCHA"
                  className="border py-2 rounded-md px-2"
                />
              </div>
              <button className="bg-blue-400 py-2 w-[30%] px-3 font-semibold text-white">
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export { SendItemModal };
