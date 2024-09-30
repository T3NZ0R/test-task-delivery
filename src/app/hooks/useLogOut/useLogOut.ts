import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";

export function useLogout() {
  const navigation = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    navigation("/sign-in");
  }, [navigation]);

  return useMemo(() => ({ logout }), [logout]);
}
