import { CartItem } from "../components/CartItem";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { BlurBackground } from "../components/BlurBackground";
import { RemoveModal } from "../components/RemoveModal";
import { openModal } from "../slices/modalSlice";
import { useCartInfo } from "../hooks/useCartStore";

export const CartPage = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);
  const { cartItems } = useCartInfo();

  const handleOpen = () => {
    dispatch(openModal());
  };

  return (
    <div className="flex flex-col w-full flex-1 justify-center items-center py-3 gap-5 px-32 mt-15">
      {cartItems.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}

      <div
        className="border-2 rounded-md px-5 py-3 cursor-pointer my-5"
        onClick={handleOpen}
      >
        전체 삭제
      </div>

      {isOpen && (
        <BlurBackground>
          <RemoveModal />
        </BlurBackground>
      )}
    </div>
  );
};
