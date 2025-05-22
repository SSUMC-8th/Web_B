import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LpCard } from "../components/homePage/LpCard";
import { LpCardSkeleton } from "../components/homePage/LpCardSkeleton";
import { PostButton } from "../components/homePage/PostButton";

export interface IFLpContent {
  id: number;
  content: string;
  thumbnail: string;
  title: string;
  likeCount: number;
  created: string;
}

export const HomePage = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [isScrollAtBottom, setIsScrollAtBottom] = useState(false);

  const getLpList = async ({ pageParam = 0 }) => {
    const response = await apiClient.get("/lps", {
      params: {
        cursor: pageParam,
        limit: 25,
        order,
      },
    });
    return response.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["lpList", order],
      queryFn: getLpList,
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    });

  // 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      // 화면 높이 + 스크롤된 높이가 전체 문서 높이에 가까우면
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      setIsScrollAtBottom(isBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 스크롤이 하단에 도달하면 다음 페이지 로드
  useEffect(() => {
    if (isScrollAtBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
      // 페이지 로드 시작 후 상태 초기화
      setIsScrollAtBottom(false);
    }
  }, [isScrollAtBottom, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <div className="bg-black h-full px-10 py-10 flex flex-col items-end justify-center gap-5">
        <div className="text-white rounded-md border-white border-1 overflow-hidden py-1">
          <span
            className={`${
              order === "asc" ? "bg-white text-black" : "bg-black text-white"
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
              order === "desc" ? "bg-white text-black" : "bg-black text-white"
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
        <div className="flex justify-start flex-wrap gap-3 overflow-visible h-full w-full ">
          {!data
            ? Array.from({ length: 20 }).map((_, i) => (
                <LpCardSkeleton key={i} />
              ))
            : data?.pages.map((page) =>
                page.data.data.map((item) => {
                  const content = {
                    id: item.id,
                    content: item.content,
                    thumbnail: item.thumbnail,
                    title: item.title,
                    likeCount: item.likes.length,
                    created: item.createdAt,
                  };
                  return <LpCard key={item.id} content={content} />;
                })
              )}
        </div>

        {isFetchingNextPage && (
          <div className="flex flex-wrap gap-3 w-full">
            {Array.from({ length: 10 }).map((_, i) => (
              <LpCardSkeleton key={i} />
            ))}
          </div>
        )}
      </div>

      <PostButton />
    </>
  );
};
