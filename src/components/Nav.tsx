import React from "react";

const Nav = () => {
  return (
    <nav className="flex justify-between px-10 p-2 items-center bg-blue-50">
      <div className="flex items-center ">
        <span className="material-icons-outlined text-5xl text-blue-500 ">
          delivery_dining
        </span>
        <h2 className="text-xl">
          LESS
          <span className="text-blue-500 font-bold">GO</span>
        </h2>
      </div>
      <button className="flex items-center gap-2 bg-blue-300 px-3 rounded py-2 hover:bg-blue-400 text-white font-semibold">
        <span>LOGOUT</span>
        <span className="material-icons-outlined">logout</span>
      </button>
    </nav>
  );
};

export { Nav };
