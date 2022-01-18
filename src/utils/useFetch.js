import { useState, useEffect } from "react";

export const useFetch = (method, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const runFetch = async () => {
      setIsLoading(true);
      try {
        const url = 'https://devnode.online/api/v0/' + method;
        const res = await fetch(url, options);
        const json = await res.json();
        setData(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    runFetch();
  }, []);
  return { data, error, isLoading };
};