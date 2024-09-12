import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { checkoutComplete, toggleStatusTab } from "~/store/cartSlice";
import { Link } from "@remix-run/react";

const CartTab = () => {
  const carts = useSelector(({ cart }) => cart.items);
  const statusTab = useSelector(({ cart }) => cart.statusTab);
  const dispatch = useDispatch();
  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  const handleCheckout = () => {
    // clear
    dispatch(checkoutComplete());
  };

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
          <button className="bg-amber-600 text-white">CHECKOUT</button>
        </Link>
      </div>
    </div>
  );
};

export default CartTab;
