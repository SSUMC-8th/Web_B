import { useState } from "react";
import { BackgroundBlur } from "../common/BackgroundBlur";
import { PostModal } from "./PostModal";

export const PostButton = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <div
        className="w-14 h-14 flex justify-center items-center rounded-full bg-pink-500 fixed bottom-10 right-4 cursor-pointer text-white text-3xl"
        onClick={() => setOpenModal(true)}
      >
        +
      </div>

      {openModal && (
        <BackgroundBlur>
          <PostModal onClose={() => setOpenModal(false)} />
        </BackgroundBlur>
      )}
    </>
  );
};
