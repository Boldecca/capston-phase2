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
    const fetchDrafts = async () => {
      try {
        // Fetch drafts from API
        const response = await fetch("/api/posts?published=false");
        if (response.ok) {
          const data = await response.json();
          setDrafts(data || []);
        }
      } catch (error) {
        console.error("Error fetching drafts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, []);

  if (loading) {
    return <div className="text-center text-slate-400">Loading drafts...</div>;
  }

  if (drafts.length === 0) {
    return (
      <div className="text-center text-slate-400 py-12">
        <p className="text-lg">No drafts yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {drafts.map((draft) => (
        <Link key={draft._id} href={`/editor/${draft._id}`}>
          <div className="bg-slate-700 border border-slate-600 rounded-lg p-6 hover:bg-slate-600 transition cursor-pointer">
            <h3 className="text-white font-semibold text-lg mb-2 truncate">
              {draft.title}
            </h3>
            <p className="text-slate-400 text-sm mb-3 line-clamp-2">
              {draft.excerpt || "No content yet"}
            </p>
            <span className="text-slate-500 text-xs">
              Saved {new Date(draft.savedAt).toLocaleString()}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}