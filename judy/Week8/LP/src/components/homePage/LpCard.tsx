import { FaHeart } from "react-icons/fa";
import { IFLpContent } from "../../pages/HomePage";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

interface Props {
  content: IFLpContent;
}

export const LpCard = ({ content }: Props) => {
  const navigate = useNavigate();
  const timeAgo = formatDistanceToNow(content.created, {
    addSuffix: true,
  });
  return (
    <div
      className="group relative flex items-end text-white text-sm px-2 py-2 gap-5  w-50 h-50 cursor-pointer hover:scale-110 transition-all duration-300 bg-gray-600"
      style={{
        backgroundImage: `url(${content.thumbnail})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => navigate(`/lp/${content.id}`)}
    >
      {/* 배경 흐림 */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 z-10"></div>

      <div className="flex items-end justify-between w-full text-xs opacity-0 group-hover:opacity-100 z-20">
        <div className="flex flex-col gap-1">
          <div className="font-bold">{content.title}</div>
          <div>{timeAgo}</div>
        </div>
        <div className="flex items-center gap-2">
          <FaHeart />
          {content.likeCount}
        </div>
      </div>
    </div>
  );
};
