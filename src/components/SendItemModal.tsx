import React from "react";

const SendItemModal = ({ setModal }: any) => {
  return (
    <main
      onClick={() => setModal((preVal: any) => !preVal)}
      className="fixed inset-0 h-screen w-screen flex justify-center items-start z-30 bg-zinc-500"
    >
      <div
        className="bg-white px-4 min-h-[40%] max-h-[80%] overflow-auto w-7/12 min-w-96 tablet:w-8/12 mobile:w-11/12 rounded shadow-2xl mt-28"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h1>Where to deliver ?</h1>
        </div>
      </div>
    </main>
  );
};

export { SendItemModal };
