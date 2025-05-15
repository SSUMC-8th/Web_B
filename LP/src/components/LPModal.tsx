// LPModal.tsx
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "../api/axios";

interface Props {
  onClose: () => void;
}

const LPModal = ({ onClose }: Props) => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate } = useMutation({
    mutationFn: async () => {
      const payload = {
        title,
        content,
        thumbnail: "https://example.com/thumbnail.png", // 임시
        tags,
        published: true,
      };
      const res = await api.post("/lps", payload);
      return res.data;
    },
    onSuccess: () => {
      onClose(); // 성공 시 모달 닫기
    },
    onError: (error) => {
      console.error("LP 생성 실패:", error);
    },
  });

  const handleAddTag = () => {
    if (tagInput.trim() === "") return;
    setTags((prev) => [...prev, tagInput.trim()]);
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-none flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#1e1e1e] text-white p-10 rounded-2xl w-[500px] shadow-2xl"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭시 닫히지 않도록
      >
        <div className="flex justify-between items-center mb-6">
          <button onClick={onClose} className="text-white text-xl">
            ✖
          </button>
          <div />
        </div>

        <div className="flex justify-center mb-6">
          <img
            src="/lp.png"
            alt="LP"
            className="w-40 h-40 rounded-full object-cover"
          />
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 p-2 bg-black border border-gray-600 rounded"
          placeholder="LP Name"
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-2 p-2 bg-black border border-gray-600 rounded"
          placeholder="LP Content"
        />
        <div className="flex gap-2 mb-4">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="flex-1 p-2 bg-black border border-gray-600 rounded"
            placeholder="LP Tag"
          />
          <button onClick={handleAddTag} className="bg-gray-500 px-3 rounded">
            Add
          </button>
        </div>

        {/* ✅ 태그 리스트 출력 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <div
              key={tag}
              className="bg-gray-700 text-white px-3 py-1 rounded-full flex items-center gap-2"
            >
              <span>{tag}</span>
              <button onClick={() => handleRemoveTag(tag)} className="text-sm">
                ❌
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => mutate()}
          className="w-full bg-gray-400 py-2 rounded"
        >
          Add LP
        </button>
      </div>
    </div>
  );
};

export default LPModal;
