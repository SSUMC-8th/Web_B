import { useQuery } from '@tanstack/react-query';
import { PaginationDto } from '../../types/common';
import { getLpList } from '../../apis/lp';
import { QUERY_KEY } from '../../constants/key';

function useGetLpList({cursor,search,order,limit}:PaginationDto){
  return useQuery({
    queryKey:[QUERY_KEY.lps,search,order],
    queryFn: () =>
      getLpList({
      cursor,
      search,
      order,
      limit,
    }),
    //staleTime 동안 데이터가 변하지 않음 (이 시간동안 캐시된 데이터 그대로 사용, 컴포넌트가 마운트 되거나 창에 포커스 들어오는 경우도 재요청x)
    staleTime: 1000 * 60 * 5, // 5분

    //garbage collection 시간 (이 시간동안 사용하지 않으면 캐시된 데이터 삭제)
    gcTime: 1000 * 60 * 10, // 10분

    //조건에 따라 쿼리 실행여부 제어
    //enabled: Boolean(search),

    //refetchInterval: 100 * 60

    //retry:3, // 쿼리요청 실패시 재요청 횟수

    //initialData: // 쿼리 실행 전 미리 제공할 초기 데이터(컴포넌트 랜더링될때 빈 데이터 구조를 미리 제공 -> 로딩 전에도 안전하게 ui구성)

    //keepPreviousData: true, // parameter 변경될 때 이전 데이터를 유지하여 ui가 깜빡이지 않도록 함(no flicking)
    
    select:(data) => data.data.data,
  })
}

export default useGetLpList