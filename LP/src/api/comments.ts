import api from './axios';

export const getComments = async ({
    lpId,
    cursor = 0,
    limit = 10,
    order = 'desc',
  }: {
    lpId: number;
    cursor?: number;
    limit?: number;
    order?: 'asc' | 'desc';
  }) => {
    const res = await api.get(`/lps/${lpId}/comments`, {
      params: { cursor, limit, order },
    });
    await new Promise(resolve => setTimeout(resolve, 1000)); //로딩바 확인용 지연

    return res.data.data;
  };