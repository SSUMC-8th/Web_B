import { useCartActions } from "../hooks/useCartStore";
import { useDispatch } from "../hooks/useCustomRedux";
import { closeModal } from "../slices/modalSlice";

export const RemoveModal = () => {
  const dispatch = useDispatch();
  const { clearCart } = useCartActions();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleRemove = () => {
    clearCart();
    dispatch(closeModal());
  };
  return (
    <div className="w-60 h-30 bg-white flex flex-col gap-2 justify-center items-center rounded-sm">
      <div className="font-bold">정말 삭제하시겠습니까?</div>
      <div className="flex gap-8">
        <button
          className="bg-neutral-300 px-2 py-1 rounded-sm cursor-pointer"
          onClick={handleClose}
        >
          아니요
        </button>
        <button
          className="py-1 px-2 bg-red-600 text-white rounded-sm cursor-pointer"
          onClick={handleRemove}
        >
          네
        </button>
      </div>
    </div>
  );
};
