import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";
import { formatDistanceToNow } from "date-fns";
import { FaHeart, FaPen, FaTrashAlt } from "react-icons/fa";
import { CommentList } from "../components/LpDetail/CommentList";

export const LpDetail = () => {
  const pathname = window.location.pathname;
  const lpId = pathname.split("/")[2];

  const getLpDetail = async () => {
    const response = await apiClient.get(`/lps/${lpId}`);
    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["lpDetail", lpId],
    queryFn: getLpDetail,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const lpInfo = data.data;
  console.log(lpInfo);

  const timeAgo = formatDistanceToNow(lpInfo.author.createdAt, {
    addSuffix: true,
  });

  return (
    <div className="flex flex-col justify-center items-center bg-black h-full w-full">
      <div className="flex flex-col gap-5 text-white px-20 py-5 w-180 h-200 rounded-lg bg-neutral-700 mt-10">
        {/* 이름, 기간 */}
        <div className="flex justify-between">
          <div className="flex gap-4">
            <img src={lpInfo.author.avatar} className="w-6 rounded-full" />
            <span>{lpInfo.author.name}</span>
          </div>
          <div>{timeAgo}</div>
        </div>

        {/* 제목, 수정, 삭제 버튼 */}
        <div className="flex items-center justify-between">
          <span>{lpInfo.title}</span>

          <div className="flex gap-3">
            <FaPen className="cursor-pointer" />
            <FaTrashAlt className="cursor-pointer" />
          </div>
        </div>

        {/* LP판 */}
        <div className="w-full flex items-center justify-center mt-10">
          <div className="flex items-center justify-center relative w-100 h-100 bg-neutral-700 shadow-lg shadow-neutral-800">
            <img
              src={lpInfo.thumbnail}
              className="rounded-full w-80 h-80 border-2 border-black animate-spin-slow"
            />
            <div className="absolute top-1/2 left-1/2 w-13 h-13 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 z-10"></div>
          </div>
        </div>

        {/* LP 설명 */}
        <div className="text-sm">{lpInfo.content}</div>

        {/* 태그 */}

        {/* 좋아요 */}
        <div className="flex items-center justify-center gap-2">
          <FaHeart className="text-pink-600" />
          {lpInfo.likes.length}
        </div>
      </div>
      <CommentList />
    </div>
  );
};
