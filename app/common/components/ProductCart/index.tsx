import { Link } from "react-router-dom";
import iconCart from "../../../assets/iconCart.png";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "~/store/cartSlice";

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
      <h3 className="text-2xl py-3 text-center font-medium">{name}</h3>
      <div className="flex justify-between items-center">
        <p>
          $<span className="text-2xl font-medium">{price}</span>
        </p>
        <button
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
