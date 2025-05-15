import { ChangeEvent, useState } from "react";
import { FaRegTrashAlt, FaUserCircle } from "react-icons/fa";
import { PiPencilLight } from "react-icons/pi";
import { IoMdMore } from "react-icons/io";
import { BsPencil } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../api/apiClient";

interface IFAuthor {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

interface IFContent {
  id: number;
  content: string;
  author: IFAuthor;
}

interface Props {
  commentContent: IFContent;
  order: string;
}

export const Comment = ({ commentContent, order }: Props) => {
  const [more, setMore] = useState<boolean>(false);
  const [modify, setModify] = useState<boolean>(false);
  const [newComment, setNewComment] = useState(commentContent.content);
  const userId = localStorage.getItem("id");
  const pathname = window.location.pathname;
  const lpId = pathname.split("/")[2];
  const commentId = commentContent.id;
  const queryClient = useQueryClient();
  const isUserComment = Number(userId) === commentContent.author.id;

  // 댓글 삭제
  const deleteMutation = useMutation({
    mutationFn: async (commentId: number) => {
      await apiClient.delete(`/lps/${lpId}/comments/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", order] });
    },
    onError: (err) => {
      console.error(err);
      alert("삭제에 실패했습니다.");
    },
  });

  const onDeleteComment = () => {
    deleteMutation.mutate(commentId);
  };

  // 댓글 수정
  const modifyMutation = useMutation({
    mutationFn: async (newComment: string) => {
      await apiClient.patch(
        `/lps/${lpId}/comments/${commentId}`,
        {
          content: newComment,
        },
        {
          params: {
            lpId,
            commentId,
          },
        }
      );
    },
    onSuccess: () => {
      setModify(false);
    },
    onError: (err) => {
      console.error(err);
      alert("댓글 수정을 실패했습니다.");
    },
  });

  const onModifyComment = () => {
    modifyMutation.mutate(newComment);
  };

  const onChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  return (
    <div className="flex items-center justify-between w-full gap-7">
      <div className="flex flex-1 items-center gap-4">
        {commentContent.author.avatar ? (
          <img
            src={commentContent.author.avatar}
            className="w-8 rounded-full"
          />
        ) : (
          <FaUserCircle size={28} />
        )}

        <div className="flex flex-col w-full">
          <div className="text-md font-bold">{commentContent.author.name}</div>
          <div className="flex w-full text-sm">
            {modify ? (
              <input
                type="text"
                value={newComment}
                className="flex-1 w-full outline-none border-1 px-1 rounded-sm"
                onChange={onChangeComment}
              />
            ) : (
              newComment
            )}
          </div>
        </div>
      </div>

      {isUserComment && (
        <div className="flex flex-col items-end gap-1 relative">
          {modify ? (
            <PiPencilLight
              size={22}
              className="cursor-pointer"
              onClick={onModifyComment}
            />
          ) : (
            <IoMdMore
              className="cursor-pointer"
              size={22}
              onClick={() => setMore(!more)}
            />
          )}

          {more && (
            <div className="flex absolute translate-y-full items-center bg-black gap-2 px-2 py-1 rounded-md">
              <BsPencil
                className="cursor-pointer"
                onClick={() => {
                  setModify(true);
                  setMore(false);
                }}
              />

              <FaRegTrashAlt
                className="cursor-pointer"
                onClick={onDeleteComment}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
