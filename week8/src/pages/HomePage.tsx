
import LpCard from '../components/LpCard/LpCard';
import LpCardSkeletonList from '../components/LpCard/LpCardSkeletonList';
import { PAGNATION_ORDER } from '../enums/common';
import useGetInfiniteLpList from '../hooks/queries/useGetInfiniteLpList';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useDebounce from '../hooks/useDebounce';
import { SEARCH_DEBOUNCE_DELAY } from '../constants/delay';


const HomePage = () => {

  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, SEARCH_DEBOUNCE_DELAY)
  // const {data,isPending,isError} = useGetLpList({
  //   search,
  //   limit: 50,
  // })

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError
  } = useGetInfiniteLpList(10, debouncedSearch, PAGNATION_ORDER.ASC)

  //react-intersection-observer에서 제공
  //ref -> 특정한 HTML요소 감시할 수 있음
  //inView -> 그 요소가 화면에 보이면 true
  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage])

  if (isError) return <h1 className='mt-20'>에러가 발생했습니다.</h1>


  return (
    <div className='container mx-auto px-4 py-6'>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />

      <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}>
        {(isFetching || isPending) && <LpCardSkeletonList count={20} />}
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => <LpCard key={lp.id} lp={lp} />)}
      </div>
      <div ref={ref} className='h-2'></div>
    </div>
  );
}
export default HomePage;

