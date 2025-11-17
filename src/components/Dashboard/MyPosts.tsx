"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  claps: number;
  createdAt: string;
}

export default function MyPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        // Mock data fallback
        setPosts([
          {
            _id: "1",
            title: "Getting Started with Next.js",
            slug: "getting-started-nextjs",
            excerpt: "Learn how to build modern web apps with Next.js...",
            coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
            claps: 234,
            createdAt: "2025-11-15",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center text-slate-400 py-8">Loading posts...</div>;
  }

  if (error && posts.length === 0) {
    return <div className="text-center text-red-400 py-8">Error: {error}</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center text-slate-400 py-12">
        <p className="text-lg">No posts yet. Start writing!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link key={post._id} href={`/articles/${post.slug}`}>
          <div className="bg-slate-700 border border-slate-600 rounded-lg overflow-hidden hover:border-blue-500 transition cursor-pointer group h-full">
            <div className="relative w-full h-48 bg-slate-600 overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:opacity-80 transition"
              />
            </div>
            <div className="p-6">
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-400 transition line-clamp-2">
                {post.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-xs">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className="text-blue-400 font-semibold">👏 {post.claps}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}