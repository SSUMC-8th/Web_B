// src/components/LPCard.tsx
import { useNavigate } from "react-router-dom";

interface LPCardProps {
  id: number;
  thumbnail: string;
  title: string;
  createdAt: string;
  likeCount: number;
  onClick?: () => void; // 추가
}

const LPCard = ({ id, thumbnail, title, createdAt, likeCount, onClick }: LPCardProps) => {
  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer transition-transform duration-300 transform hover:scale-105"
    >
      <img src={thumbnail} alt={title} className="w-full aspect-square object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
        <p className="text-white text-sm font-semibold">{title}</p>
        <p className="text-gray-300 text-xs">{new Date(createdAt).toLocaleDateString()}</p>
        <p className="text-gray-300 text-xs">❤️ {likeCount}</p>
      </div>
    </div>
  );
};

export default LPCard;