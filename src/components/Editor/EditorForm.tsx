"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./image-uploader";
import { renderMarkdown } from "./markdown-utils";

export default function EditorForm() {
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState<string>("");
  const [coverImage, setCoverImage] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("# Your title\n\nStart writing...");
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSave(state: "draft" | "published" = "draft") {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          coverImage: coverImage || undefined,
          state,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error((j as any).error || "Failed to save");
      }
      const j = await res.json();
      const slug = j?.data?.slug as string;
      router.push(`/posts/${slug}`);
    } catch (e: any) {
      setError(e?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="An awesome post title"
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Tags (comma separated)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="nextjs, typescript"
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm">Cover image URL</label>
          <input
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
          />
          <div className="mt-2 text-xs text-muted-foreground">Use the uploader below or paste any image URL.</div>
        </div>
        <div>
          <label className="mb-1 block text-sm">Content (Markdown)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={14}
            className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none font-mono"
          />
        </div>
        {error ? <div className="text-sm text-red-500">{error}</div> : null}
        <div className="flex items-center gap-2">
          <button onClick={() => onSave("draft")} disabled={saving} className="rounded-md border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-60">
            {saving ? "Saving..." : "Save Draft"}
          </button>
          <button onClick={() => onSave("published")} disabled={saving} className="rounded-md bg-foreground px-3 py-2 text-sm text-background disabled:opacity-60">
            Publish
          </button>
        </div>
        <div className="pt-4 border-t">
          <ImageUploader />
        </div>
      </div>
      <div>
        <div className="mb-3 text-sm font-medium opacity-70">Preview</div>
        <article className="prose dark:prose-invert max-w-none border rounded-md p-4">
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
        </article>
      </div>
    </div>
  );
}
