import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../api/axios";
import LPCard from "../components/LPCard";
import { useDebounce } from "../hooks/useDebounce";
import { useThrottle } from "../hooks/useThrottle";
import { FiSearch } from "react-icons/fi";
import { BiSortUp, BiSortDown } from "react-icons/bi";

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "desc";

  const [inputValue, setInputValue] = useState(search);
  const [searchType, setSearchType] = useState<"title" | "tag">(
    searchParams.get("type") === "tag" ? "tag" : "title"
  );
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">(
    sort === "asc" ? "oldest" : "latest"
  );
  const debouncedSearch = useDebounce(inputValue, 500);

  const handleSearch = () => {
    const newParams = new URLSearchParams();
    newParams.set("search", inputValue);
    newParams.set("sort", sortOrder === "latest" ? "desc" : "asc");
    newParams.set("type", searchType);
    setSearchParams(newParams);
  };

  useEffect(() => {
    const newParams = new URLSearchParams();
    newParams.set("search", debouncedSearch);
    newParams.set("sort", sortOrder === "latest" ? "desc" : "asc");
    newParams.set("type", searchType);
    setSearchParams(newParams);
  }, [debouncedSearch, sortOrder, searchType]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["search", debouncedSearch, sortOrder, searchType],
    queryFn: async ({ pageParam = 0 }) => {
      console.log("fetching LPs...");
      const res = await api.get("/lps", {
        params: {
          search: debouncedSearch,
          order: sortOrder === "latest" ? "desc" : "asc",
          type: searchType,
          cursor: pageParam,
          limit: 6,
        },
      });
      console.log(res.data);
      return res.data.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
  });

  const throttledFetchNext = useThrottle(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, 1000);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        throttledFetchNext();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [throttledFetchNext]);

  return (
    <div className="p-6 text-white max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🔍 검색 결과</h2>
      <div className="flex gap-2 mb-4">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as "title" | "tag")}
          className="text-sm px-2 py-1 rounded-md text-white"
        >
          <option value="title" className="text-white">
            제목
          </option>
          <option value="tag" className="text-white">
            태그
          </option>
        </select>
        <button onClick={handleSearch}>
          <FiSearch className="text-white text-xl cursor-pointer" />
        </button>
        <button
          onClick={() =>
            setSortOrder(sortOrder === "latest" ? "oldest" : "latest")
          }
        >
          {sortOrder === "latest" ? (
            <BiSortUp className="text-white text-xl" title="최신순" />
          ) : (
            <BiSortDown className="text-white text-xl" title="오래된순" />
          )}
        </button>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="mb-4 w-full px-4 py-2 rounded-md bg-[#2e2e2e] text-white"
        placeholder="검색어를 입력하세요"
      />
      {isLoading ? (
        <p className="text-white text-center mt-10">검색 중...</p>
      ) : isError ? (
        <p className="text-white text-center mt-10">
          검색 결과를 불러오지 못했습니다.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data?.pages.flatMap((page) =>
              page.data.map((lp: any) => (
                <div key={lp.id}>
                  <LPCard
                    id={lp.id}
                    thumbnail={lp.thumbnail}
                    title={lp.title}
                    createdAt={lp.createdAt}
                    likeCount={lp.likes.length}
                    onClick={() => (window.location.href = `/lp/${lp.id}`)}
                  />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {lp.tags.map((tag: any) => (
                      <span
                        key={tag.id}
                        className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResult;
