export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export type ApiResponse<T> = {
  data: T;
  error?: string;
};
