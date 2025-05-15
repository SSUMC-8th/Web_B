import React from "react";
import { Lp } from "../types/lp";

interface LPControlsProps {
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  lp: Lp;
  editLp: () => void;
  deleteLp: () => void;
  setEditTitle: (value: string) => void;
  setEditContent: (value: string) => void;
  setEditThumbnail: (value: string) => void;
  setEditTags: (value: string) => void;
}

const LPControls = ({
  editMode,
  setEditMode,
  lp,
  editLp,
  deleteLp,
  setEditTitle,
  setEditContent,
  setEditThumbnail,
  setEditTags,
}: LPControlsProps) => {
  return (
    <div className="absolute top-6 right-6 flex gap-2">
      {!editMode ? (
        <>
          <button
            onClick={() => {
              setEditMode(true);
              setEditTitle(lp.title);
              setEditContent(lp.content);
              setEditThumbnail(lp.thumbnail);
              setEditTags(lp.tags.map((tag) => tag.name).join(", "));
            }}
            className="flex items-center gap-1 px-3 py-1 border border-gray-500 rounded hover:bg-gray-700 transition-colors duration-200"
          >
            ✏️ <span className="text-sm">수정</span>
          </button>
          <button
            onClick={() => {
              if (window.confirm("정말 삭제하시겠습니까?")) {
                deleteLp();
              }
            }}
            className="flex items-center gap-1 px-3 py-1 border border-gray-500 rounded hover:bg-red-700 transition-colors duration-200"
          >
            🗑️ <span className="text-sm">삭제</span>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={editLp}
            className="px-3 py-1 bg-blue-600 rounded text-white text-sm"
          >
            저장
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="px-3 py-1 bg-gray-600 rounded text-white text-sm"
          >
            취소
          </button>
        </>
      )}
    </div>
  );
};

export default LPControls;
