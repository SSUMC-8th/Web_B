import { FaUserCircle } from "react-icons/fa";

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
}

export const Comment = ({ commentContent }: Props) => {
  return (
    <div className="flex gap-4 items-center w-full">
      {commentContent.author.avatar ? (
        <img src={commentContent.author.avatar} className="w-8 rounded-full" />
      ) : (
        <FaUserCircle size={8} />
      )}

      <div className="flex flex-col">
        <div className="text-sm font-bold">{commentContent.author.name}</div>
        <div className="text-xs">{commentContent.content}</div>
      </div>
    </div>
  );
};
