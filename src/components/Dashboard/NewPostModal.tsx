"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface NewPostModalProps {
  onClose: () => void;
}

export default function NewPostModal({ onClose }: NewPostModalProps) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleCreate = async () => {
    setErrorMsg(null);
    if (!title.trim()) {
      setErrorMsg("Please enter a title");
      return;
    }

    setLoading(true);
    
    // Get token from cookies
    const getToken = () => {
      if (typeof window === 'undefined') return null;
      const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('SESSION_COOKIE='));
      return cookie ? cookie.split('=')[1] : null;
    };

    try {
      const token = getToken();
      
      if (!token) {
        throw new Error("Please sign in to create a post");
      }

      // First, get the current user's ID
      const userResponse = await fetch("/api/auth/me", {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (userResponse.status === 401) {
        // Token is invalid or expired
        throw new Error("Your session has expired. Please sign in again.");
      }

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user information");
      }

      const userData = await userResponse.json();
      const userId = userData?.data?.user?._id;

      if (!userId) {
        throw new Error("User not found. Please try signing in again.");
      }

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: title.trim(),
          content: "",
          published: false,
          author: userId, // Include the user's ID as the author
        }),
      });

      // Read body regardless of status for diagnostics
      const text = await response.text();
      let body;
      try { body = text ? JSON.parse(text) : null; } catch { body = text; }

      if (!response.ok) {
        console.error("Create post failed:", {
          status: response.status,
          statusText: response.statusText,
          body,
        });
        setErrorMsg(
          body?.message || body || `Server returned ${response.status} ${response.statusText}`
        );
        return;
      }

      const post = body;
      if (!post || !post._id) {
        console.warn("Created post response missing _id:", post);
        setErrorMsg("Post created but response is unexpected. Check server logs.");
        return;
      }

      router.push(`/editor/${post._id}`);
      onClose();
    } catch (err) {
      console.error("Network or client error creating post:", err);
      setErrorMsg("Network error. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-4">Create New Post</h2>

        <input
          type="text"
          placeholder="Enter post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg mb-4 focus:outline-none"
        />

        {errorMsg && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/10 p-2 rounded">{errorMsg}</div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}