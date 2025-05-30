import { FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

export const Header = () => {
  const { amount, cartItems } = useCartInfo();
  const { sumPrice } = useCartActions();
  // const { amount, cartItems } = useSelector((state) => state.cart);
  // const dispatch = useDispatch();

  useEffect(() => {
    sumPrice();
  }, [cartItems, sumPrice]);
  return (
    <div className="w-full h-15 bg-black flex justify-between px-5 items-center text-white fixed">
      <div className="text-2xl font-bold">JYPLAYLIST</div>
      <div className="flex items-center gap-3">
        <FaShoppingCart size={20} />
        <span>{amount}</span>
      </div>
    </div>
  );
};
