import clsx from "clsx";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = ({ page, setPage }: Props) => {
  const onNextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage((prev) => prev + 1);
  };

  const onPrevPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (page !== 1) {
      setPage((prev) => prev - 1);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-40 gap-7">
      <button
        className={clsx(
          "w-15 h-15 rounded-md text-white cursor-pointer",
          page === 1
            ? "bg-gray-400 hover:bg-gray-400"
            : "bg-lime-500 hover:bg-lime-400"
        )}
        onClick={onPrevPage}
      >
        {"<"}
      </button>
      <div>{page} 페이지</div>
      <button
        className="w-15 h-15 rounded-md bg-lime-500 hover:bg-lime-400 text-white cursor-pointer"
        onClick={onNextPage}
      >
        {">"}
      </button>
    </div>
  );
};
