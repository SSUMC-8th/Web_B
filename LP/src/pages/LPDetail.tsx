// NOTE: clsx가 설치되어 있지 않다면 'npm install clsx' 또는 'yarn add clsx' 필요
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchLpDetail } from "../api/lp";
import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import clsx from "clsx";
import { useComments } from "../hooks/useComments";

const LPDetail = () => {
  const { LPid } = useParams();
  const { user } = useAuthContext();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const {
    data: lp,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lpDetail", LPid],
    queryFn: () => fetchLpDetail(LPid!),
    enabled: !!LPid,
    onSuccess: (data) => {
      setLiked(data.likes.some((like) => like.userId === user?.id));
      setLikeCount(data.likes.length);
    },
  });

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    // TODO: 실제 서버에 좋아요 요청 보내기
  };

  const isAuthor = user?.id === lp?.author?.id;

  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const { data: comments, fetchNextPage, hasNextPage, isLoading: isLoadingComments, isFetchingNextPage } = useComments(Number(LPid), order);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || !loaderRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <p className="text-white text-center mt-10">로딩 중...</p>;
  }

  if (isError || !lp) {
    return <p className="text-white text-center mt-10">LP 정보를 불러올 수 없습니다.</p>;
  }

  return (
    <div className="w-full">
      <main className="flex-1 text-white px-4">
        <div className="bg-[#1e1e1e] rounded-lg p-6 w-full max-w-3xl mx-auto transition-all duration-300 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">🟢 {lp.author.name}</span>
            <span className="text-xs text-gray-400">
              {new Date(lp.createdAt).toLocaleDateString("ko-KR")}
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-4">{lp.title}</h2>

          <div className="flex justify-center mb-4">
            <div className="w-80 h-80 bg-black/30 rounded-lg shadow-md flex items-center justify-center relative">
              <img
                src={lp.thumbnail}
                alt="LP"
                className="w-60 h-60 rounded-full object-cover animate-spin border-[6px] border-gray-600"
              />
              <div className="absolute w-8 h-8 bg-black rounded-full z-10" />
            </div>
            
          </div>

          <p className="text-sm text-gray-300 leading-relaxed text-center mt-4">{lp.content}</p>

          <div className="flex flex-wrap gap-2 mt-4 text-sm justify-center">
            {lp.tags.map((tag) => (
              <span key={tag.id} className="bg-gray-700 px-3 py-1 rounded-full">
                #{tag.name}
              </span>
            ))}
          </div>

          <div className="flex flex-col items-center mt-6 space-y-2">
            {isAuthor && (
              <div className="absolute top-6 right-6 flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1 border border-gray-500 rounded hover:bg-gray-700 transition-colors duration-200">
                  ✏️ <span className="text-sm">수정</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-1 border border-gray-500 rounded hover:bg-red-700 transition-colors duration-200">
                  🗑️ <span className="text-sm">삭제</span>
                </button>
              </div>
            )}

            <button
              onClick={handleLike}
              className={clsx(
                "transition-transform duration-200",
                liked ? "text-pink-400 scale-110" : "text-white scale-100"
              )}
            >
              {liked ? "❤️" : "🤍"} {likeCount}
            </button>
          </div>

          <div className="mt-8 w-full max-w-3xl mx-auto">
            <div className="mb-4">
              <input
                className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"
                placeholder="댓글을 입력해주세요"
                disabled
              />
              <button className="mt-2 px-4 py-1 rounded bg-gray-700 text-white text-sm" disabled>
                작성
              </button>
            </div>
            <div className="flex justify-end mb-2 gap-2">
              <button
                onClick={() => setOrder('desc')}
                className={clsx('px-2 py-1 rounded text-sm', order === 'desc' ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-300')}
              >
                최신순
              </button>
              <button
                onClick={() => setOrder('asc')}
                className={clsx('px-2 py-1 rounded text-sm', order === 'asc' ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-300')}
              >
                오래된 순
              </button>
            </div>

            {isLoadingComments && !isFetchingNextPage ? (
              <div className="space-y-4 animate-pulse">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="flex items-start gap-3 border-b border-gray-700 pb-4">
                    <div className="w-8 h-8 rounded-full bg-gray-700" />
                    <div className="flex-1 space-y-2">
                      <div className="w-1/4 h-4 bg-gray-700 rounded" />
                      <div className="w-full h-3 bg-gray-700 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-[#222] px-4 py-2 space-y-4">
                {comments?.pages.map((page) =>
                  page.data.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-3 border-b border-gray-700 pb-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 overflow-hidden">
                        {comment.author.avatar ? (
                          <img
                            src={comment.author.avatar}
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white text-sm font-semibold bg-gray-600">
                            {comment.author.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-white">{comment.author.name}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-200 mt-1">{comment.content}</p>
                      </div>
                    </div>
                  ))
                )}
                {hasNextPage && <div ref={loaderRef} className="h-6" />}
              </div>
            )}
            {isFetchingNextPage && (
              <div className="space-y-4 animate-pulse mt-4">
                {Array.from({ length: 2 }).map((_, idx) => (
                  <div key={idx} className="flex items-start gap-3 border-b border-gray-700 pb-4">
                    <div className="w-8 h-8 rounded-full bg-gray-700" />
                    <div className="flex-1 space-y-2">
                      <div className="w-1/4 h-4 bg-gray-700 rounded" />
                      <div className="w-full h-3 bg-gray-700 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LPDetail;