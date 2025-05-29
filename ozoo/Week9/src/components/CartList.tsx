import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import CartItem from "./CartItem";
import { clearCart, calculateTotals } from "../features/cart/cartSlice";
import { openModal } from "../features/modal/modalSlice";

const CartList = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [items]);

  return (
    <div>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <div className="text-center mt-4">
        <p className="text-lg font-semibold">총 수량: {totalQuantity}개</p>
        <p className="text-lg font-semibold">
          총 금액: ₩{totalAmount.toLocaleString()}
        </p>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => dispatch(openModal())}
          className="bg-white text-black border border-black px-4 py-2 rounded-md"
        >
          전체 삭제
        </button>
      </div>
    </div>
  );
};

export default CartList;
