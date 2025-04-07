import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: boolean;
}

const useCostomFetch = <T>(url: string): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<T>(url);

        setData(response.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useCostomFetch;
