"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface NewPostModalProps {
  onClose: () => void;
}

export default function NewPostModal({ onClose }: NewPostModalProps) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    setLoading(true);
    try {
      // Create draft post
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          content: "",
          published: false,
          // userId from session/auth
        }),
      });

      if (!response.ok) throw new Error("Failed to create post");
      
      const post = await response.json();
      router.push(`/editor/${post._id}`);
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) handleCreate();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full border border-slate-700 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6">Create New Post</h2>
        
        <input
          type="text"
          placeholder="Enter post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 disabled:opacity-50"
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition disabled:opacity-50 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}