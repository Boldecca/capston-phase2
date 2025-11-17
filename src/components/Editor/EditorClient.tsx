"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import RichTextEditor from "./RichTextEditor"; // keep or create this component

export default function EditorClient() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const saveDraft = async () => {
    if (!title.trim()) return alert("Enter a title");
    setIsSaving(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, published: false }),
      });
      if (!res.ok) throw new Error("Save failed");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const publish = async () => {
    if (!title.trim() || !content.trim()) return alert("Add title and content");
    setIsSaving(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, published: true }),
      });
      if (!res.ok) throw new Error("Publish failed");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to publish");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Write a New Post</h1>
          <div className="flex gap-2">
            <button onClick={saveDraft} disabled={isSaving} className="px-4 py-2 bg-gray-200 rounded">
              {isSaving ? "Saving..." : "Save Draft"}
            </button>
            <button onClick={publish} disabled={isSaving} className="px-4 py-2 bg-blue-600 text-white rounded">
              {isSaving ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="w-full text-3xl font-bold mb-4 bg-transparent border-none outline-none"
        />

        <div className="bg-white border rounded p-4">
          <RichTextEditor value={content} onChange={setContent} />
        </div>
      </div>
    </div>
  );
}