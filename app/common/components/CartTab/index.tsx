import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { toggleStatusTab } from "~/store/cartSlice";
import { Link } from "@remix-run/react";
import { AxonEvents, pushToDatalayer } from "~/utils/axon";
import { products } from "../../../products";
import { useCallback } from "react";

const CartTab = () => {
  const carts = useSelector(({ cart }) => cart.items);
  const statusTab = useSelector(({ cart }) => cart.statusTab);
  const dispatch = useDispatch();
  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  const handleCheckout = useCallback(() => {
    // close side drawer
    dispatch(toggleStatusTab());
    // add to datalayer
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
    // GTM Axon begin checkout
    pushToDatalayer(AxonEvents.beginCheckoutClick, {
      value: sumPrice,
      items: items,
    });
  }, [carts, dispatch]);

  return (
    <div
      className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] 
    transform transition-transform duration-500
    ${statusTab === false ? "translate-x-full" : ""}
    `}
    >
      <h2 className="p-5 text-white text-2xl">Shopping Cart</h2>
      <div className="p-5">
        {carts.map((item, key) => (
          <CartItem key={key} data={item} />
        ))}
      </div>
      <div className="grid grid-cols-2">
        <button className="bg-black text-white" onClick={handleCloseTabCart}>
          CLOSE
        </button>
        <Link to="/payment">
          <button
            id="begin_checkout"
            onClick={handleCheckout}
            className="bg-amber-600 text-white"
          >
            CHECKOUT
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartTab;
