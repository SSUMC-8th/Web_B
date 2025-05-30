import api from "./axios";
import type { Lp } from "../types/lp"; // Unified type import

interface FetchLpsParams {
  cursor?: number;
  limit?: number;
  order?: "asc" | "desc";
  search?: string;
}

export const fetchLps = async ({
  cursor = 0,
  limit = 10,
  order = "desc",
  search = "",
}: FetchLpsParams): Promise<{ items: Lp[]; nextCursor: number | null }> => {
  try {
    const response = await api.get("/lps", {
      params: { cursor, limit, order, search },
    });
    const result = response.data.data;
    return {
      items: Array.isArray(result?.data) ? result.data : [],
      nextCursor: result?.hasNext ? result.nextCursor : null,
    };
  } catch (err) {
    console.error("LP 목록 불러오기 실패", err);
    throw err;
  }
};

export const fetchLpDetail = async (lpId: string | number): Promise<Lp> => {
  const response = await api.get(`/lps/${lpId}`);
  const data = response.data.data;

  const withTagIds = {
    ...data,
    tags: data.tags.map((tag: { name: string }, idx: number) => ({
      id: idx,
      name: tag.name,
    })),
  };

  return withTagIds;
};
