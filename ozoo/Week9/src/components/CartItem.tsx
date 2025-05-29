import React from "react";
import { useDispatch } from "react-redux";
import { increaseAmount, decreaseAmount } from "../features/cart/cartSlice";
import type { CartItem as CartItemType } from "../features/cart/cartSlice";

interface Props {
  item: CartItemType;
}

const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      <img
        src={item.img}
        alt={item.title}
        className="w-20 h-20 object-cover rounded-md mr-4"
      />
      <div className="flex-1">
        <h3 className="text-base font-medium mb-1">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{item.singer}</p>
        <strong className="text-black">₩{item.price}</strong>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => dispatch(decreaseAmount(item.id))}
          className="bg-gray-300 text-white px-3 py-1 rounded-md"
        >
          -
        </button>
        <span>{item.amount}</span>
        <button
          onClick={() => dispatch(increaseAmount(item.id))}
          className="bg-gray-300 text-white px-3 py-1 rounded-md"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
