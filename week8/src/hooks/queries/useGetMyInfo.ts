import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants/key';
import { getMyInfo } from '../../apis/auth';
import { useAuth } from '../../context/AuthContext';

function useGetMyInfo(accessToken?: string|null) {
  return useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
    enabled: !!accessToken,
    // accessToken이 존재할 때만 쿼리를 실행합니다.
  })
}
export default useGetMyInfo;