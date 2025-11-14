export type SessionUser = { id: string; name: string; email: string; image?: string };

export function getAuthToken() {
  if (typeof window === "undefined") return undefined;
  return localStorage.getItem("token") || undefined;
}
