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
  views?: number;
}

export default function MyPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (response.ok) {
          const data = await response.json();
          setPosts(data || []);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([
          {
            _id: "1",
            title: "Getting Started with Next.js",
            slug: "getting-started-nextjs",
            excerpt: "Learn how to build modern web apps with Next.js and React...",
            coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
            claps: 234,
            views: 1240,
            createdAt: "2025-11-15",
          },
          {
            _id: "2",
            title: "React Hooks Deep Dive",
            slug: "react-hooks-deep-dive",
            excerpt: "Master React hooks with advanced patterns and best practices...",
            coverImage: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=600&h=400&fit=crop",
            claps: 456,
            views: 2100,
            createdAt: "2025-11-10",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg animate-pulse h-96"></div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-lg">
        <div className="text-5xl mb-4">✍️</div>
        <p className="text-xl font-semibold mb-2">No posts yet</p>
        <p className="text-gray-400 mb-6">Start creating amazing content today</p>
        <Link
          href="/editor"
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Create Your First Post
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link key={post._id} href={`/articles/${post.slug}`}>
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-blue-500 transition group h-full flex flex-col">
            {/* Image */}
            <div className="relative w-full h-48 bg-gray-800 overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-400 transition line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                {post.excerpt}
              </p>

              {/* Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                <span className="text-gray-500 text-xs">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <div className="flex gap-4 text-sm">
                  <span className="text-gray-400 flex items-center gap-1">
                    👁️ {post.views || 0}
                  </span>
                  <span className="text-blue-400 font-semibold flex items-center gap-1">
                    👏 {post.claps}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}