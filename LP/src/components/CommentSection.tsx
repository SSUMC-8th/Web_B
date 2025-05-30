import React, { useState, useEffect, useRef } from "react";
import { useComments } from "../hooks/useComments";
import api from "../api/axios";

interface CommentSectionProps {
  LPid: number;
  user: { id: number; name: string } | null;
}

const CommentSection = ({ LPid, user }: CommentSectionProps) => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const {
    comments,
    comment,
    setComment,
    submitComment,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useComments(LPid, order);

  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div className="mt-6 w-full max-w-xl mx-auto px-4">
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setOrder("desc")}
          className={`px-3 py-1 rounded ${
            order === "desc"
              ? "bg-gray-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => setOrder("asc")}
          className={`px-3 py-1 rounded ${
            order === "asc"
              ? "bg-gray-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          오래된순
        </button>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!comment.trim()) return;

          if (editingCommentId) {
            // Only patch if content changed
            const editingComment = comments?.find(
              (c) => c.id === editingCommentId
            );
            if (editingComment && editingComment.content === comment) {
              setEditingCommentId(null);
              setComment("");
              return;
            }
            try {
              await api.patch(`/lps/${LPid}/comments/${editingCommentId}`, {
                content: comment,
              });
              setEditingCommentId(null);
              setComment("");
              await fetchNextPage({ pageParam: 0 }); // simulate refetch
            } catch (err) {
              console.error("댓글 수정 실패:", err);
            }
          } else {
            await submitComment(comment);
          }
        }}
        className="flex items-center gap-2 mb-4"
      >
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-gray-600 text-white"
          disabled={
            !comment?.trim() ||
            (editingCommentId
              ? comments?.find((c) => c.id === editingCommentId)?.content ===
                comment
              : false)
          }
        >
          등록
        </button>
      </form>
      {/* Conditional rendering: skeleton or comments */}
      <div>
        {isLoading ? (
          <ul className="space-y-4 min-h-[300px]">
            {Array.from({ length: 5 }).map((_, idx) => (
              <li
                key={idx}
                className="animate-pulse flex gap-3 items-start bg-gray-600 p-3 rounded text-sm text-white"
              >
                <div className="w-8 h-8 bg-gray-500 rounded-full" />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="bg-gray-500 h-4 w-1/3 rounded" />
                  <div className="bg-gray-500 h-3 w-full rounded" />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-2 min-h-[300px]">
            {comments?.map((c) =>
              c && c.author ? (
                <li
                  key={c.id}
                  className="flex gap-3 items-start bg-gray-800 p-3 rounded text-sm text-white relative"
                >
                  <img
                    src={c.author.avatar || "/default-avatar.png"}
                    alt={`${c.author.name} 프로필`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">{c.author.name}</div>
                      {user?.id === c.author.id && (
                        <div className="relative">
                          <button
                            onClick={() =>
                              setMenuOpenId((prev) =>
                                prev === c.id ? null : c.id
                              )
                            }
                            className="text-gray-400 hover:text-white text-xl"
                          >
                            ⋯
                          </button>
                          {menuOpenId === c.id && (
                            <div className="absolute right-0 mt-2 w-24 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-10">
                              <button
                                onClick={() => {
                                  setEditingCommentId(c.id);
                                  setEditingContent(c.content);
                                  setMenuOpenId(null);
                                }}
                                className="block w-full px-4 py-2 text-sm text-left text-white hover:bg-gray-700 transition-colors"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={async () => {
                                  if (confirm("정말 삭제하시겠습니까?")) {
                                    try {
                                      await api.delete(
                                        `/lps/${LPid}/comments/${c.id}`
                                      );
                                      await fetchNextPage({ pageParam: 0 }); // simulate refetch
                                    } catch (err) {
                                      console.error("삭제 실패:", err);
                                    }
                                  }
                                  setMenuOpenId(null);
                                }}
                                className="block w-full px-4 py-2 text-sm text-left text-red-400 hover:bg-gray-700 transition-colors"
                              >
                                🗑️
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {editingCommentId === c.id ? (
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          className="flex-1 p-1 px-2 text-sm text-white bg-transparent border border-gray-500 rounded"
                        />
                        <button
                          onClick={async () => {
                            if (!editingContent.trim()) return;
                            try {
                              await api.patch(
                                `/lps/${LPid}/comments/${editingCommentId}`,
                                {
                                  content: editingContent,
                                }
                              );
                              setEditingCommentId(null);
                              setEditingContent("");
                              await fetchNextPage({ pageParam: 0 });
                            } catch (err) {
                              console.error("댓글 수정 실패:", err);
                            }
                          }}
                          className="text-white text-xl"
                        >
                          ✔
                        </button>
                        <button
                          onClick={() => {
                            setEditingCommentId(null);
                            setEditingContent("");
                          }}
                          className="text-gray-400 hover:text-white text-xl"
                        >
                          ✖
                        </button>
                      </div>
                    ) : (
                      <div className="text-gray-300">{c.content}</div>
                    )}
                  </div>
                </li>
              ) : null
            )}
          </ul>
        )}
      </div>
      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
};

export default CommentSection;
