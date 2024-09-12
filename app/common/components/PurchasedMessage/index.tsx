import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dismissPurchasedToast } from "~/store/cartSlice";

const PurchasedMessage = () => {
  const isComplete = useSelector(({ cart }) => cart.hasPurchased);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isComplete) {
      setTimeout(() => {
        dispatch(dismissPurchasedToast());
      }, 1000);
    }
  }, [dispatch, isComplete]);

  return isComplete ? (
    <div className="absolute top-1/2 left-0 right-0 items-center justify-center flex flex-col">
      <div className="bg-white shadow rounded-xl p-[1rem]">
        <span className="text-[1.5rem]">Purchase Complete! 🎉</span>
      </div>
    </div>
  ) : null;
};

export default PurchasedMessage;
