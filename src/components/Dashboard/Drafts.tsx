"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Draft {
  _id: string;
  title: string;
  excerpt: string;
  savedAt: string;
}

export default function Drafts() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDrafts([
        {
          _id: "d1",
          title: "TypeScript Best Practices",
          excerpt: "A comprehensive guide to writing better TypeScript code...",
          savedAt: "2025-11-16T10:30:00",
        },
        {
          _id: "d2",
          title: "Understanding CSS Grid",
          excerpt: "Master CSS Grid layout system with real-world examples...",
          savedAt: "2025-11-15T15:45:00",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="text-center text-gray-400">Loading drafts...</div>;
  }

  if (drafts.length === 0) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-lg">
        <div className="text-5xl mb-4">📝</div>
        <p className="text-xl font-semibold mb-2">No drafts</p>
        <p className="text-gray-400">Your drafts will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {drafts.map((draft) => (
        <Link key={draft._id} href={`/editor/${draft._id}`}>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-500 hover:bg-gray-800/50 transition group">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-white font-semibold text-lg group-hover:text-blue-400 transition flex-1">
                {draft.title}
              </h3>
              <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded">
                Draft
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-3">{draft.excerpt}</p>
            <span className="text-gray-500 text-xs">
              Last saved {new Date(draft.savedAt).toLocaleString()}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}