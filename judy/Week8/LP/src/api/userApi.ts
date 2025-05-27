import { apiClient } from "./apiClient";

export const withdrawalUser = async () => {
  const res = await apiClient.delete("/users");

  return res;
};
