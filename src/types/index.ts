export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  bio?: string;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  tags?: Tag[];
  author: User;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  id: string;
  postId: string;
  author: User;
  content: string;
  parentId?: string;
  createdAt: string;
};
