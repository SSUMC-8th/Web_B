import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { apiClient } from "../../api/apiClient";
import { CommentSkeleton } from "./CommentSkeleton";
import { Comment } from "./Comment";

export const CommentList = () => {
  const pathname = window.location.pathname;
  const lpId = pathname.split("/")[2];
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const commentContainerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const getLpList = async ({ pageParam = 0 }) => {
    const response = await apiClient.get(`/lps/${lpId}/comments`, {
      params: {
        cursor: pageParam,
        limit: 10,
        order,
      },
    });
    return response.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["comment", order],
      queryFn: getLpList,
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    });

  // 스크롤 이벤트
  useEffect(() => {
    const container = commentContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // 이미 로딩 중이면 스킵
      if (loadingRef.current || !hasNextPage || isFetchingNextPage) return;

      const { scrollTop, scrollHeight, clientHeight } = container;

      if (scrollHeight - scrollTop - clientHeight < 20) {
        loadingRef.current = true;
        fetchNextPage().finally(() => {
          // 데이터 로드 후 로딩 상태 초기화
          setTimeout(() => {
            loadingRef.current = false;
          }, 300);
        });
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  console.log(data);

  return (
    <div className="flex flex-col gap-5 text-white px-10 py-5 w-180 h-150 rounded-lg bg-neutral-700 mt-5 mb-10">
      <div className="flex justify-between">
        <h2>댓글</h2>
        <div className="text-white rounded-md border-white border-1 overflow-hidden py-1">
          <span
            className={`${
              order === "asc"
                ? "bg-white text-black"
                : "bg-neutral-700 text-white"
            } cursor-pointer px-4 py-2`}
            onClick={() => {
              if (order !== "asc") {
                setOrder("asc");
              }
            }}
          >
            오래된 순
          </span>{" "}
          <span
            className={`${
              order === "desc"
                ? "bg-white text-black"
                : "bg-neutral-700 text-white"
            } cursor-pointer px-4 py-2`}
            onClick={() => {
              if (order !== "desc") {
                setOrder("desc");
              }
            }}
          >
            최신순
          </span>
        </div>
      </div>

      {/* 댓글 입력란 */}
      <div className="flex items-center gap-5">
        <input
          type="text"
          placeholder="댓글을 입력해주세요."
          className="border-1 flex-1 rounded-sm px-2 py-1"
        />
        <button className="px-5 py-1 rounded-sm bg-gray-500 cursor-pointer">
          작성
        </button>
      </div>

      {/* 댓글 목록 */}
      <div
        className="flex flex-col h-full gap-3 overflow-y-scroll"
        ref={commentContainerRef}
      >
        {!data || isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <CommentSkeleton key={i} />
            ))
          : data?.pages.map((page) =>
              page.data.data.map((item) => {
                const commentContent = {
                  id: item.id,
                  content: item.content,
                  author: item.author,
                };
                return (
                  <Comment key={item.id} commentContent={commentContent} />
                );
              })
            )}

        {isFetchingNextPage &&
          Array.from({ length: 10 }).map((_, i) => <CommentSkeleton key={i} />)}
      </div>
    </div>
  );
};
