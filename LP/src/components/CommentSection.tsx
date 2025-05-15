import React from "react";
import { useComments } from "../hooks/useComments";

interface CommentSectionProps {
  LPid: string;
  user: { id: number; name: string } | null;
}

const CommentSection = ({ LPid, user }: CommentSectionProps) => {
  const { comments, comment, setComment, submitComment } = useComments(LPid);

  return (
    <div className="mt-6 w-full max-w-xl mx-auto px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitComment(comment);
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
          className="px-4 py-2 rounded bg-blue-600 text-white"
          disabled={!comment?.trim()}
        >
          등록
        </button>
      </form>
      <ul className="space-y-2">
        {comments?.map((c) => (
          <li key={c.id} className="bg-gray-800 p-3 rounded text-sm text-white">
            <div className="font-semibold">{c.user.name}</div>
            <div className="text-gray-300">{c.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
