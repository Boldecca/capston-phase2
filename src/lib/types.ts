export type PostState = "draft" | "published";

export type Post = {
  id: string;
  slug: string;
  title: string;
  content: string; // markdown for now
  coverImage?: string;
  tags: string[];
  authorId: string;
  state: PostState;
  createdAt: number;
  updatedAt: number;
};
