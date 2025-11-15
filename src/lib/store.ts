import { Post } from "./types";

const posts = new Map<string, Post>();

export function createPost(p: Omit<Post, "id" | "createdAt" | "updatedAt">): Post {
  const id = crypto.randomUUID();
  const now = Date.now();
  const post: Post = { id, createdAt: now, updatedAt: now, ...p };
  posts.set(id, post);
  return post;
}

export function listPosts(): Post[] {
  return Array.from(posts.values()).sort((a, b) => b.createdAt - a.createdAt);
}

export function getPost(id: string): Post | undefined {
  return posts.get(id);
}

export function getPostBySlug(slug: string): Post | undefined {
  for (const p of posts.values()) if (p.slug === slug) return p;
  return undefined;
}

export function updatePost(id: string, patch: Partial<Omit<Post, "id" | "createdAt">>): Post | undefined {
  const p = posts.get(id);
  if (!p) return undefined;
  const updated: Post = { ...p, ...patch, updatedAt: Date.now() } as Post;
  posts.set(id, updated);
  return updated;
}

export function deletePost(id: string): boolean {
  return posts.delete(id);
}
