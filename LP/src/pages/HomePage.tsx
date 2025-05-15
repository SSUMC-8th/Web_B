import { useState, useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import api from "../api/axios";
import LPCard from "../components/LPCard";
import LPModal from "../components/LPModal";
import FAB from "../components/FAB";

// LP 리스트 요청 함수
const fetchLps = async ({
  pageParam = 0,
  order,
}: {
  pageParam?: number;
  order: "asc" | "desc";
}) => {
  const res = await api.get("lps", {
    params: {
      order,
      cursor: pageParam,
      limit: 20,
    },
  });

  const result = res.data.data;

  await new Promise((resolve) => setTimeout(resolve, 500)); //지연 로딩효과 확인용
  return {
    items: Array.isArray(result?.data) ? result.data : [],
    nextCursor: result?.hasNext ? result.nextCursor : null,
  };
};

const HomePage = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const loadMoreRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const handleFABClick = () => {
    setShowModal(true);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["lps", order],
      queryFn: ({ pageParam = 0 }) => fetchLps({ pageParam, order }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 0,
    });

  const handleCardClick = (id: number) => {
    if (!isLoggedIn) {
      const shouldLogin = window.confirm(
        "로그인이 필요한 서비스입니다. 로그인 해주세요!"
      );
      if (shouldLogin) navigate("/login");
      return;
    }
    navigate(`/lp/${id}`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [hasNextPage, fetchNextPage]);

  console.log("data:", data);

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-end gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded ${
              order === "asc" ? "bg-white text-black" : "bg-gray-800 text-white"
            }`}
            onClick={() => setOrder("asc")}
          >
            오래된순
          </button>
          <button
            className={`px-3 py-1 rounded ${
              order === "desc"
                ? "bg-white text-black"
                : "bg-gray-800 text-white"
            }`}
            onClick={() => setOrder("desc")}
          >
            최신순
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col gap-2">
                  <div className="bg-white aspect-square rounded-md" />
                  <div className="bg-white h-4 w-3/4 rounded" />
                  <div className="bg-white h-3 w-1/2 rounded" />
                </div>
              ))
            : data?.pages.flatMap((page) =>
                page.items.map(
                  (lp: {
                    id: number;
                    thumbnail: string;
                    title: string;
                    createdAt: string;
                    likeCount?: number;
                  }) => (
                    <LPCard
                      key={lp.id}
                      id={lp.id}
                      thumbnail={lp.thumbnail}
                      title={lp.title}
                      createdAt={lp.createdAt}
                      likeCount={lp.likeCount ?? 0}
                      onClick={() => handleCardClick(lp.id)}
                    />
                  )
                )
              )}
        </div>

        {isFetchingNextPage && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col gap-2">
                <div className="bg-white aspect-square rounded-md" />
                <div className="bg-white h-4 w-3/4 rounded" />
                <div className="bg-white h-3 w-1/2 rounded" />
              </div>
            ))}
          </div>
        )}

        <div ref={loadMoreRef} className="h-10" />
      </div>
      <FAB onClick={handleFABClick} />
      {showModal && <LPModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default HomePage;
