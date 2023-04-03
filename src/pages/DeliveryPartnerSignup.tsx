import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface SignupDetails {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: number;
  area: string;
  isAvailable: true;
}

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
  { title: "Phone Number", name: "phone", placeholder: "+91", type: "number" },
  {
    title: "Delivery Area",
    name: "area",
    placeholder: "Please mention your deliverying area",
    type: "text",
  },
];

const DeliveryPartnerSignup = () => {
  const [signupDetails, setSignupDetails] = useState<SignupDetails>({
    name: "",
    email: "",
    password: "",
    role: "deliveryPartner",
    area: "vijay nagar",
    isAvailable: true,
    phone: 0,
  });
  const navigate = useNavigate();
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupDetails((previousData) => ({
      ...previousData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (
    signupDetails: SignupDetails,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      e.preventDefault();
      if (
        !signupDetails.email ||
        !signupDetails.name ||
        !signupDetails.password ||
        !signupDetails.phone ||
        !signupDetails.area
      ) {
        return alert("Please fill all the details");
      }

      const { status, data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users`,
        signupDetails
      );
      if (status === 201) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/delivery-dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="flex items-center m-2 mx-8 pt-10 gap-10">
      <div className="max-w-full grow basis-0">
        <img src={"/images/deliverytruck.png"} alt="login-poster" />
      </div>
      <div className="max-w-full grow basis-0 mx-10 px-12">
        <form onSubmit={(e) => submitHandler(signupDetails, e)}>
          <h2 className="text-3xl font-semibold mb-6">
            Become <span className="text-blue-500">Delivery Partner</span>{" "}
            Today!
          </h2>
          {signupFields.map((field) => {
            return (
              <div key={field.name} className="flex flex-col">
                <label htmlFor={field.name} className="font-medium">
                  {field.title}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  onChange={(e) => inputHandler(e)}
                  name={field.name}
                  placeholder={field.placeholder}
                  className=" p-3 border border-gray rounded-md focus:outline-blue-400  my-2"
                />
              </div>
            );
          })}

          <button className=" block mt-4 bg-blue-500 text-white font-semibold w-full py-3 rounded-md">
            LESS GO
          </button>
        </form>
      </div>
    </section>
  );
};

export { DeliveryPartnerSignup };
