import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getComments } from "../api/comments";
import api from "../api/axios";
import { useState } from "react";

// 댓글 등록 API 호출 함수
const postComment = async (lpId: number, content: string) => {
  const res = await api.post(`/lps/${lpId}/comments`, { content });
  return res.data;
};

export const useComments = (lpId: number, order: "asc" | "desc") => {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["comments", lpId, order],
      queryFn: async ({ pageParam = 0 }) => {
        const res = await getComments({ lpId, cursor: pageParam, order });
        console.log("댓글 페이지 응답:", res);
        return res;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage?.hasNext ? lastPage.nextCursor : undefined,
    });

  const comments = data?.pages.flatMap((page) => page?.comments ?? []) ?? [];

  const submitComment = async (content: string) => {
    try {
      await postComment(lpId, content);
      setComment("");
      refetch(); // 새로고침으로 댓글 목록 업데이트
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    }
  };

  return {
    comments,
    comment,
    setComment,
    submitComment,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
