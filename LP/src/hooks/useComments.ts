import { useInfiniteQuery } from '@tanstack/react-query';
import { getComments } from '../api/comments';

export const useComments = (lpId: number, order: 'asc' | 'desc') =>
  useInfiniteQuery({
    queryKey: ['comments', lpId, order],
    queryFn: ({ pageParam = 0 }) =>
      getComments({ lpId, cursor: pageParam, order }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
  });