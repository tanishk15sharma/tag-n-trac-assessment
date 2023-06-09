import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginDetails {
  email: string;
  password: string;
}

const Login = () => {
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginDetails((previousData) => ({
      ...previousData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (
    loginDetails: LoginDetails,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      e.preventDefault();

      const { status, data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users?email=${loginDetails.email}&password=${loginDetails.password}`
      );
      if (status === 200) {
        if (data.length === 0) {
          setLoginDetails({
            email: "",
            password: "",
          });
          return alert("User not found");
        }
        delete data[0].password;
        localStorage.setItem("userInfo", JSON.stringify(data[0]));

        if (data[0].role === "customer") {
          return navigate("/");
        } else {
          return navigate("/delivery-dashboard");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="flex items-center m-4 mx-8 pt-16 gap-10">
      <div className="max-w-full grow basis-0">
        <img src={"/images/deliverytruck.png"} alt="login-poster" />
      </div>
      <div className="max-w-full grow basis-0 mx-10 px-12">
        <form onSubmit={(e) => submitHandler(loginDetails, e)}>
          <h2 className="text-3xl font-semibold mb-10">
            <span className="text-blue-500">Sign In </span>
            To Your Account
            <span className="text-blue-500">!</span>
          </h2>
          <div className="flex flex-col">
            <label htmlFor="username" className="font-medium">
              Email
            </label>
            <input
              type="text"
              value={loginDetails.email}
              onChange={(e) => inputHandler(e)}
              name="email"
              placeholder="User@gmail.com"
              className=" p-3 border border-gray rounded-md focus:outline-blue-400 mt-1 mb-8"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="font-medium">
              Password
            </label>
            <input
              type="text"
              value={loginDetails.password}
              onChange={(e) => inputHandler(e)}
              name="password"
              placeholder="********"
              className=" p-3 border border-gray rounded-md focus:outline-blue-400 mt-1 mb-8"
            />
          </div>

          <button className=" mt-8 block bg-blue-500 text-white font-semibold w-full py-3 rounded-md">
            LOGIN
          </button>
        </form>
        <h3 className="text-lg font-medium mt-3">
          Don’t have an account?
          <button onClick={() => navigate("/signup")}>
            <span className="text-blue-500 font-medium ml-1"> Sign up</span>
          </button>
        </h3>
      </div>
    </section>
  );
};

export { Login };
