import { useMutation } from '@tanstack/react-query';
import { postLike } from '../../apis/lp';
import { QUERY_KEY } from '../../constants/key';
import { queryClient } from '../../App';
import { ResponseLikeLpDto } from '../../types/lp';



function usePostLike() {

  return useMutation({
    mutationFn: postLike,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
    })
  },
    onError: (error) => {
      console.error('Error liking the post:', error);
    },
    onSettled: () => {
      // Optionally, you can perform any actions after the mutation is settled
    },
    onMutate:(variables) => {
    
    },
})
}

export default usePostLike
