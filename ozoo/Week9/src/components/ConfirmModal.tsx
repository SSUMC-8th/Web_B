// components/ConfirmModal.tsx
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { closeModal } from "../features/modal/modalSlice";
import { clearCart } from "../features/cart/cartSlice";

const ConfirmModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded shadow text-center">
        <p className="mb-4 font-semibold">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => dispatch(closeModal())}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            아니요
          </button>
          <button
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
