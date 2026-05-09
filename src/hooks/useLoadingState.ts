import { useState } from "react";

export interface LoadingState {
  loading: boolean;
  error: string | null;
}

export function useLoadingState() {
  const [state, setState] = useState<LoadingState>({
    loading: false,
    error: null,
  });

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  const withLoading = async <T>(asyncFn: () => Promise<T>): Promise<T | null> => {
    try {
      setLoading(true);
      clearError();
      return await asyncFn();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    ...state,
    setLoading,
    setError,
    clearError,
    withLoading,
  };
}
