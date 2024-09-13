import { Link } from "react-router-dom";
import iconCart from "../../../assets/iconCart.png";
import { useDispatch } from "react-redux";
import { addToCart } from "~/store/cartSlice";
import { AxonEvents, pushToDatalayer } from "~/utils/axon";

interface Props {
  data: {
    id: number;
    name: string;
    price: number;
    image: string;
    slug: string;
  };
}

const ProductCart = (props: Props) => {
  //   const carts = useSelector(({ cart }) => cart.items);
  const { id, name, price, image, slug } = props.data;

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    pushToDatalayer(AxonEvents.addToCartClick, {
      value: price,
      items: [
        {
          item_id: id,
          item_name: name,
          item_category: "chair",
          price: price,
          quantity: 1,
        },
      ],
    });
    dispatch(
      addToCart({
        productId: id,
        quantity: 1,
      })
    );
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <Link to={`/${slug}`}>
        <img
          src={image}
          alt=""
          className="w-full h-80 object-contain object-top drop-shadow-[0_80px_30px_#0007]"
        />
      </Link>
      <h3 id="product_name" className="text-2xl py-3 text-center font-medium">
        {name}
      </h3>
      <div className="flex justify-between items-center">
        <p>
          $
          <span id="product_price" className="text-2xl font-medium">
            {price}
          </span>
        </p>
        <button
          id="add_to_cart"
          className="bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2"
          onClick={handleAddToCart}
        >
          <img src={iconCart} alt="" className="w-5" />
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
