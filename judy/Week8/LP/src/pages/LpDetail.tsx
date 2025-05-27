import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";
import { formatDistanceToNow } from "date-fns";
import { FaHeart, FaPen, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { CommentList } from "../components/LpDetail/CommentList";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UpdateRequest {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}

export const LpDetail = () => {
  const [modify, setModify] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [like, setLike] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const userId = localStorage.getItem("id");
  const lpId = pathname.split("/")[2];

  const getLpDetail = async () => {
    const response = await apiClient.get(`/lps/${lpId}`);
    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["lpDetail", lpId],
    queryFn: getLpDetail,
  });

  useEffect(() => {
    if (data?.data) {
      setNewTitle(data.data.title);
      setNewContent(data.data.content);

      const isLiked = data.data.likes.some(
        (like: { id: number; userId: number; lpId: number }) =>
          like.userId === Number(userId)
      );

      setLike(isLiked);
    }
  }, [data?.data, userId]);

  // 제목 onChange 함수
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  // 내용 onChange 함수
  const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setNewContent(e.target.value);
  };

  // 수정
  const updatePostMutation = useMutation({
    mutationFn: async (data: UpdateRequest) => {
      await apiClient.patch(`/lps/${lpId}`, data);
    },
    onSuccess: () => {
      setModify(false);
    },
    onError: (err) => {
      console.error(err);
      alert("게시글을 수정하는데 오류가 발생했습니다.");
    },
  });

  // 삭제
  const deletePostMutation = useMutation({
    mutationFn: async () => {
      await apiClient.delete(`/lps/${lpId}`);
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (err) => {
      console.error(err);
      alert("게시글을 삭제하는데 실패했습니다.");
    },
  });

  // 좋아요
  const likeMutation = useMutation({
    mutationFn: async () => {
      await apiClient.post(`/lps/${lpId}/likes`);
    },
    onMutate: async () => {
      // 요청 중인 쿼리 중단
      await queryClient.cancelQueries({ queryKey: ["lpDetail", lpId] });

      // 이전 데이터 백업
      const previous = queryClient.getQueryData(["lpDetail", lpId]);

      // 캐시 직접 업데이트
      queryClient.setQueryData(["lpDetail", lpId], (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: {
            ...old.data,
            likes: [...old.data.likes, { userId }],
          },
        };
      });
      //UI도 변경
      setLike(true);

      // rollback을 위한 이전 데이터 리턴
      return { previous };
    },
    onError: (err, _, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["lpDetail", lpId], context.previous);
      }
      setLike(false); //롤백
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
    },
  });

  // 좋아요 취소
  const unLikeMutation = useMutation({
    mutationFn: async () => {
      await apiClient.delete(`/lps/${lpId}/likes`);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["lpDetail", lpId] });

      const previous = queryClient.getQueryData(["lpDetail", lpId]);

      queryClient.setQueryData(["lpDetail", lpId], (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: {
            ...old.data,
            likes: old.data.likes.filter(
              (like: { userId: string }) => like.userId !== userId
            ),
          },
        };
      });

      setLike(false);
      return { previous };
    },
    onError: (err, _, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["lpDetail", lpId], context.previous);
      }

      setLike(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
    },
  });

  const onUpdatePost = () => {
    if (!lpInfo) return;
    const tagNames = lpInfo.tags.map(
      (tag: { id: number; name: string }) => tag.name
    );

    const request = {
      title: newTitle,
      content: newContent,
      thumbnail: lpInfo.thumbnail,
      tags: tagNames,
      published: lpInfo.published,
    };

    console.log(request);
    if (newTitle && newContent) {
      updatePostMutation.mutate(request);
    }
  };

  const onDeletePost = () => {
    deletePostMutation.mutate();
  };

  const likePost = () => {
    likeMutation.mutate();
  };

  const unLikePost = () => {
    unLikeMutation.mutate();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const lpInfo = data.data;
  console.log(lpInfo);

  const timeAgo = formatDistanceToNow(lpInfo.createdAt, {
    addSuffix: true,
  });

  return (
    <div className="flex flex-col justify-center items-center bg-black h-full ml-45">
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
          {modify ? (
            <input
              type="text"
              value={newTitle}
              onChange={onChangeTitle}
              className="border-1 px-1 rounded-sm"
            />
          ) : (
            <span>{newTitle}</span>
          )}

          {Number(userId) === lpInfo.authorId && modify ? (
            <div
              className="text-lg cursor-pointer font-bold"
              onClick={onUpdatePost}
            >
              수정
            </div>
          ) : (
            <div className="flex gap-3">
              <FaPen
                className="cursor-pointer"
                onClick={() => setModify(true)}
              />
              <FaTrashAlt className="cursor-pointer" onClick={onDeletePost} />
            </div>
          )}
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
        {modify ? (
          <input
            type="text"
            value={newContent}
            onChange={onChangeContent}
            className="border-1 px-1 rounded-sm"
          />
        ) : (
          <div className="text-sm">{newContent}</div>
        )}

        {/* 태그 */}
        <div className="flex">
          {lpInfo.tags.map((lp: { id: number; name: string }) => (
            <div
              key={lp.id}
              className="px-5 bg-neutral-500 flex items-center justify-center rounded-full"
            >
              # {lp.name}
            </div>
          ))}
        </div>

        {/* 좋아요 */}
        <div className="flex items-center justify-center gap-2">
          {like ? (
            <FaHeart
              className="text-pink-600 cursor-pointer"
              onClick={unLikePost}
            />
          ) : (
            <FaRegHeart className="cursor-pointer" onClick={likePost} />
          )}

          {lpInfo.likes.length}
        </div>
      </div>
      <CommentList />
    </div>
  );
};
