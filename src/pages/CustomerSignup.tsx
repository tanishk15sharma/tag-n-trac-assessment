import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const signupFields = [
  { title: "Name", name: "name", placeholder: "Your Name", type: "text" },
  {
    title: "Email",
    name: "email",
    placeholder: "User@gmail.com",
    type: "email",
  },
  {
    title: "Password",
    name: "password",
    placeholder: "*********",
    type: "password",
  },
  { title: "Phone Number", name: "number", placeholder: "+91", type: "number" },
];

const CustomerSignup = () => {
  const [SignupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    phone: 0,
  });

  const navigate = useNavigate();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupDetails((previousData) => ({
      ...previousData,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <section className="flex items-center m-2 mx-8 pt-16 gap-10">
      <div className="max-w-full grow basis-0">
        <img src={"/images/deliverytruck.png"} alt="login-poster" />
      </div>
      <div className="max-w-full grow basis-0 mx-10 px-12">
        <form
        // onSubmit={(e) => submitHandler(loginDetails, e)}
        >
          <h2 className="text-3xl font-semibold mb-6">Create your account</h2>
          {signupFields.map((field) => {
            return (
              <div className="flex flex-col">
                <label htmlFor={field.name} className="font-medium">
                  {field.title}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  //   value={loginDetails.email}
                  //   onChange={(e) => inputHandler(e)}
                  name={field.name}
                  placeholder={field.placeholder}
                  className=" p-3 border border-gray rounded-md focus:outline-blue-400  my-2"
                />
              </div>
            );
          })}

          <div className="flex flex-col">
            <label htmlFor="username" className="font-medium">
              Email
            </label>
            <input
              type="text"
              //   value={loginDetails.email}
              //   onChange={(e) => inputHandler(e)}
              name="email"
              placeholder="User@gmail.com"
              className=" p-3 border border-gray rounded-md focus:outline-blue-400 mt-1 mb-8"
            />
          </div>

          <button className=" block bg-blue-500 text-white font-semibold w-full py-3 rounded-md">
            LESS GO
          </button>
        </form>
      </div>
    </section>
  );
};

export { CustomerSignup };
