type PageButtonsProps = {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
  };
  
  const PageButtons = ({ page, setPage }: PageButtonsProps) => {
    return (
      <div className="flex justify-center my-4 gap-4">
        <button 
          onClick={() => setPage((prev) : number => prev - 1)} 
          className='px-4 py-2 bg-[#dda5e3] text-white  rounded-lg shadow-md hover:bg-[#bfa0d7] transition-colors duration-300 disabled:opacity-50 
          cursor-pointer disabled:cursor-not-allowed'
          disabled={page === 1}
        >
          {'<'}
        </button>
        <span className="text-xl">{page}</span>
        <button 
          onClick={() => setPage((prev) : number => prev + 1)} 
          className='px-4 py-2 bg-[#dda5e3] text-white  rounded-lg shadow-md hover:bg-[#bfa0d7] transition-colors duration-300 disabled:opacity-50 
          cursor-pointer disabled:cursor-not-allowed'
        >
          {'>'}
        </button>
      </div>
    );
  };
  
  export default PageButtons;