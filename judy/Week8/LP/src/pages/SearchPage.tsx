import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";
import useDebounce from "../hooks/useDeboune";
import { LpCardSkeleton } from "../components/homePage/LpCardSkeleton";
import { LpCard } from "../components/homePage/LpCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import useThrottle from "../hooks/useThrottle";

export const SearchPage = () => {
  const [search, setSearch] = useState<string>("");
  const [isScrollAtBottom, setIsScrollAtBottom] = useState(false);
  const debounceValue = useDebounce(search, 1000);

  const getSearchList = async ({ pageParam = 0 }) => {
    const response = await apiClient.get("/lps", {
      params: {
        cursor: pageParam,
        limit: 25,
        search: debounceValue,
      },
    });
    return response.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["lpList", search],
      queryFn: getSearchList,
      initialPageParam: 0,
      getNextPageParam: (lastPage: any) =>
        lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
      enabled: debounceValue.trim().length > 0,
    });

  const handleScroll = useThrottle(() => {
    // 화면 높이 + 스크롤된 높이가 전체 문서 높이에 가까우면
    const isBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 100;

    setIsScrollAtBottom(isBottom);
  }, 2000);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // 스크롤이 하단에 도달하면 다음 페이지 로드
  useEffect(() => {
    if (isScrollAtBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
      // 페이지 로드 시작 후 상태 초기화
      setIsScrollAtBottom(false);
    }
  }, [isScrollAtBottom, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col px-10 py-10">
      <input
        className="border-1 text-white py-2 px-2 rounded-md outline-none"
        placeholder="검색할 단어를 적어주세요"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex justify-start flex-wrap gap-3 overflow-visible h-full w-full mt-10">
        {!data && debounceValue
          ? Array.from({ length: 20 }).map((_, i) => <LpCardSkeleton key={i} />)
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
  );
};
