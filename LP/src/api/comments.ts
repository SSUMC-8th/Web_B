import api from "./axios";

export const getComments = async ({
  lpId,
  cursor = 0,
  limit = 10,
  order = "desc",
}: {
  lpId: number;
  cursor?: number;
  limit?: number;
  order?: "asc" | "desc";
}) => {
  const res = await api.get(`/lps/${lpId}/comments`, {
    params: { cursor, limit, order },
  });
  await new Promise((resolve) => setTimeout(resolve, 1000)); //로딩바 확인용 지연

  console.log("getComments 반환값:", res.data);
  return {
    comments: res.data.data.data, //댓글 리스트
    nextCursor: res.data.data.nextCursor,
    hasNext: res.data.data.hasNext,
  };
};
