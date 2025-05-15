export const CommentSkeleton = () => {
  return (
    <div className="flex gap-4 items-center w-full">
      <div className="w-8 rounded-full animate-pulse bg-neutral-500"></div>

      <div className="flex flex-col">
        <div className="animate-pulse bg-neutral-500 w-40"></div>
        <div className="animate-pulse w-full bg-neutral-500"></div>
      </div>
    </div>
  );
};
