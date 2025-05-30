import React from "react";

interface LikeButtonProps {
  liked: boolean;
  likeCount: number;
  handleLike: () => void;
}

const LikeButton = ({ liked, likeCount, handleLike }: LikeButtonProps) => {
  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-1 mt-4 text-sm px-3 py-2 rounded-full ${
        liked ? "bg-pink-600 text-white" : "bg-gray-800 text-gray-300"
      } hover:opacity-80 transition`}
    >
      {liked ? "❤️" : "🤍"} 좋아요 {likeCount}
    </button>
  );
};

export default LikeButton;
