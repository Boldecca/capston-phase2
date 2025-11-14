import { useEffect, useState } from "react";
import { getAuthToken } from "@/lib/auth";

export function useAuth() {
  const [token, setToken] = useState<string | undefined>();
  useEffect(() => {
    setToken(getAuthToken());
  }, []);
  const isAuthenticated = Boolean(token);
  return { token, isAuthenticated } as const;
}
