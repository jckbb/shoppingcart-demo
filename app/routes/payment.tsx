import { useCallback, useState } from "react";
import { AxonEvents, pushToDatalayer } from "~/utils/axon";
import { products } from "../products";
import { useSelector } from "react-redux";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { uuid } from "uuidv4";

export const loader = async () => {
  return {
    userId: uuid(),
  };
};

const Payment = () => {
  const { userId } = useLoaderData();
  const fetcher = useFetcher();
  const [formData, setFormData] = useState({
    name: "John D Doe",
    cardNumber: "12312341234",
    expiration: "1243",
    cvc: "321",
  });
  const carts = useSelector(({ cart }) => cart.items);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (carts.length <= 0) return;

      let sumPrice = 0;
      let items = [];

      carts.forEach((cart) => {
        const product = products.find((obj) => obj.id === cart.productId);
        sumPrice += product.price;
        items.push({
          item_id: product.id,
          item_name: product.name,
          item_category: "chair",
          price: product.price,
          quantity: cart.quantity,
        });
      });
      // GTM Axon checkout
      pushToDatalayer(AxonEvents.purchaseClick, {
        transaction_id: new Date().getTime().toString(),
        items: items,
        value: sumPrice,
        user_id: userId,
      });
    },
    [carts, userId]
  );

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Payment Information
      </h2>
      <fetcher.Form method="POST" onSubmit={handleSubmit}>
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
      </fetcher.Form>
    </div>
  );
};

export default Payment;
