// src/components/DleteUserModal.tsx
import React from "react";

interface DeleteUserModalProps {
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteUserModal = ({ onDelete, onCancel }: DeleteUserModalProps) => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="relative bg-[#2c2c2c] p-6 rounded-xl text-center text-white w-[300px] shadow-lg">
        <button onClick={onCancel} className="absolute top-2 right-2 text-xl">
          ✖
        </button>
        <p className="mb-6 mt-4">정말 탈퇴하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onDelete}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            예
          </button>
          <button
            onClick={onCancel}
            className="bg-pink-500 text-white px-4 py-2 rounded"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
