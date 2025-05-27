import { IoClose } from "react-icons/io5";

interface Props {
  tag: string;
  onRemove: () => void;
}

export const Tag = ({ tag, onRemove }: Props) => {
  return (
    <div className="border px-3 rounded-full items-center flex justify-between gap-1 ">
      <span className="truncate">{tag}</span>
      <IoClose onClick={onRemove} className="cursor-pointer" />
    </div>
  );
};
