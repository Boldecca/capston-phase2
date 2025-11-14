export type SessionUser = { id: string; name: string; email: string; image?: string };

export const SESSION_COOKIE = "session";

type UserRecord = SessionUser & { password: string };
type SessionRecord = { token: string; userId: string; createdAt: number };

const users = new Map<string, UserRecord>();
const sessions = new Map<string, SessionRecord>();

export function getUserByEmail(email: string) {
  for (const u of users.values()) {
    if (u.email.toLowerCase() === email.toLowerCase()) return u;
  }
  return undefined;
}

export function createUser(name: string, email: string, password: string): SessionUser {
  const id = crypto.randomUUID();
  const rec: UserRecord = { id, name, email, password };
  users.set(id, rec);
  return { id, name, email };
}

export function verifyUser(email: string, password: string): SessionUser | undefined {
  const u = getUserByEmail(email);
  if (!u) return undefined;
  if (u.password !== password) return undefined;
  return { id: u.id, name: u.name, email: u.email };
}

export function createSession(userId: string) {
  const token = crypto.randomUUID();
  const rec: SessionRecord = { token, userId, createdAt: Date.now() };
  sessions.set(token, rec);
  return token;
}

export function getUserBySession(token?: string): SessionUser | undefined {
  if (!token) return undefined;
  const s = sessions.get(token);
  if (!s) return undefined;
  const user = users.get(s.userId);
  if (!user) return undefined;
  return { id: user.id, name: user.name, email: user.email };
}

export function revokeSession(token?: string) {
  if (!token) return;
  sessions.delete(token);
}

export function getAuthToken() {
  if (typeof window === "undefined") return undefined;
  return localStorage.getItem("token") || undefined;
}
