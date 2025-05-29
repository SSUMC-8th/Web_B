// src/components/Modal.tsx
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { closeModal } from '../slices/modalSlice';
import { clearCart } from '../slices/cartSlice';

export const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  if (!isOpen) return null;

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className='fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center'>
      <div className='bg-white p-8 rounded shadow'>
        <h2 className='text-lg font-bold mb-4'>모든 아이템을 삭제하시겠습니까?</h2>
        <div className='flex justify-end space-x-4'>
          <button onClick={handleCancel} className='px-4 py-2 bg-gray-300 rounded'>아니요</button>
          <button onClick={handleConfirm} className='px-4 py-2 bg-red-500 text-white rounded'>네</button>
        </div>
      </div>
    </div>
  );
};
