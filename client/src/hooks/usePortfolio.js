import { useCallback, useEffect, useState } from 'react';
import { fetchPortfolio } from '../services/portfolioService';

export function usePortfolio() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const portfolio = await fetchPortfolio();
      setData(portfolio);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    data,
    isLoading,
    error,
    reload: load,
  };
}
