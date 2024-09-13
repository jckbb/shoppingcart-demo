import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../products";
import { useDispatch } from "react-redux";
import { addToCart } from "~/store/cartSlice";
import { AxonEvents, pushToDatalayer } from "~/utils/axon";

const Detail = () => {
  const { slug } = useParams();
  const [detail, setDetail] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const findDetail = products.filter((product) => product.slug === slug);
    if (findDetail.length > 0) {
      const productDetails = findDetail[0];
      pushToDatalayer(AxonEvents.viewProduct, {
        items: [
          {
            item_id: productDetails.id,
            item_name: productDetails.name,
            item_category: "chair",
            price: productDetails.price,
            quantity: 1,
          },
        ],
      });
      setDetail(productDetails);
    } else {
      window.location.href = "/";
    }
  }, [slug]);

  const handleMinusQuantity = () => {
    setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
  };
  const handlePlusQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleAddToCart = () => {
    // GTM add to cart
    pushToDatalayer(AxonEvents.addToCartClick, {
      value: detail.price,
      items: [
        {
          item_id: detail.id,
          item_name: detail.name,
          item_category: "chair",
          price: detail.price,
          quantity: 1,
        },
      ],
    });
    dispatch(
      addToCart({
        productId: detail.id,
        quantity: quantity,
      })
    );
  };

  return (
    <div>
      <h2 className="text-3xl text-center">PRODUCT DETAIL</h2>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <img
            src={detail.image}
            alt=""
            className="w-full object-contain object-top"
          />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl uppercase font-bold">{detail.name}</h1>
          <p className="font-bold text-3xl">${detail.price}</p>
          <div className="flex gap-5">
            <div className="flex gap-2 justify-center items-center">
              <button
                className="bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center"
                onClick={handleMinusQuantity}
              >
                -
              </button>
              <span className="bg-gray-200 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center">
                {quantity}
              </span>
              <button
                className="bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center"
                onClick={handlePlusQuantity}
              >
                +
              </button>
            </div>
            <button
              id="add_to_cart"
              className="bg-slate-900 text-white px-7 py-3 rounded-xl shadow-2xl"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
          <p>{detail.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
