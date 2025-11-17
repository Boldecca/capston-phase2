"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  slug: string;
  status: "Published" | "Draft";
  createdAt: string;
}

export default function MyPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPosts([
        {
          _id: "1",
          title: "A Journey into Next.js",
          slug: "journey-nextjs",
          status: "Published",
          createdAt: "Apr 20, 2024",
        },
        {
          _id: "2",
          title: "Understanding React Hooks",
          slug: "react-hooks",
          status: "Published",
          createdAt: "Apr 18, 2024",
        },
        {
          _id: "3",
          title: "Deploying Applications with Vercel",
          slug: "deploying-vercel",
          status: "Published",
          createdAt: "Apr 15, 2024",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="text-center text-gray-400 py-8">Loading posts...</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 border border-gray-200 rounded-lg bg-gray-50">
        <p className="text-gray-600 text-lg">No posts yet</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-gray-900 font-medium">{post.title}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  post.status === "Published"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {post.status}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-600 text-sm">{post.createdAt}</td>
              <td className="px-6 py-4 text-sm">
                <Link href={`/editor/${post._id}`} className="text-blue-600 hover:text-blue-800 font-medium mr-4">
                  Edit
                </Link>
                <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}