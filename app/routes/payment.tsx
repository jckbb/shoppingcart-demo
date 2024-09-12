import { ActionFunction, redirect } from "@remix-run/node";
import { useState } from "react";

export const action: ActionFunction = async () => {
  console.log("hit");
  return redirect("/");
};

const Payment = () => {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiration: "",
    cvc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can add payment processing logic here
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Payment Information
      </h2>
      <form method="post" action="/payment">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Name on Card
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="cardNumber"
            className="block text-gray-700 font-semibold mb-2"
          >
            Card Number
          </label>
          <input
            type="text"
            name="cardNumber"
            id="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div className="flex justify-between mb-4">
          <div className="w-1/2 pr-2">
            <label
              htmlFor="expiration"
              className="block text-gray-700 font-semibold mb-2"
            >
              Expiration Date
            </label>
            <input
              type="text"
              name="expiration"
              id="expiration"
              placeholder="MM/YY"
              value={formData.expiration}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>

          <div className="w-1/2 pl-2">
            <label
              htmlFor="cvc"
              className="block text-gray-700 font-semibold mb-2"
            >
              CVC
            </label>
            <input
              type="text"
              name="cvc"
              id="cvc"
              value={formData.cvc}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;
