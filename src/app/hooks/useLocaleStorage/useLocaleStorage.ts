import { useCallback, useMemo } from "react";
import { ILocaleStorage } from "../../lib/interfaces/interfaces";

export const useLocaleStorage = ({ key }: ILocaleStorage) => {
  const setLocaleStorage = useCallback(
    (value: string) => {
      localStorage.setItem(key, value);
    },
    [key]
  );

  const getLocaleStorage = useCallback(() => {
    return localStorage.getItem(key);
  }, [key]);

  return useMemo(
    () => ({ setLocaleStorage, getLocaleStorage }),
    [setLocaleStorage, getLocaleStorage]
  );
};
