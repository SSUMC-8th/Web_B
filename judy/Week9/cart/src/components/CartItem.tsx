import { useCartActions } from "../hooks/useCartStore";
import type { IFCart } from "../types/cart";

interface Props {
  item: IFCart;
}

export const CartItem = ({ item }: Props) => {
  const { increase, decrease, removeItem } = useCartActions();

  const handleIncreaseCount = () => {
    increase(item.id);
  };
  const handleDecreaseCount = () => {
    if (item.amount === 1) {
      removeItem(item.id);
      return;
    }
    decrease(item.id);
  };
  return (
    <div className="w-full flex justify-between border-b-1 border-neutral-200 pb-5 px-3">
      <div className="flex gap-3">
        <img src={item.img} alt="앨범 커버" className="w-25 rounded-sm" />

        <div className="flex flex-col justify-center">
          <div className="font-bold text-lg">{item.title}</div>
          <div className="font-semibold text-neutral-500 text-sm">
            {item.singer}
          </div>
          <div className="font-bold text-sm">${item.price}</div>
        </div>
      </div>

      <div className="flex items-center">
        <button
          className="w-6 h-6 bg-neutral-300 flex items-center justify-center rounded-sm cursor-pointer"
          onClick={handleDecreaseCount}
        >
          -
        </button>
        <div className="w-8 h-6 flex justify-center items-center rounded-sm border-2 border-neutral-300">
          {item.amount}
        </div>
        <button
          className="w-6 h-6 bg-neutral-300 flex items-center justify-center rounded-sm cursor-pointer"
          onClick={handleIncreaseCount}
        >
          +
        </button>
      </div>
    </div>
  );
};
