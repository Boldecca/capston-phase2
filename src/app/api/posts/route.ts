import { NextRequest, NextResponse } from "next/server";
import { createPost, listPosts } from "@/lib/store";
import { getUserBySession, SESSION_COOKIE } from "@/lib/auth";
import type { Post } from "@/lib/types";

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

export async function GET() {
  const posts = listPosts();
  return NextResponse.json({ data: posts });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const user = getUserBySession(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const title = String(body?.title || "").trim();
  const content = String(body?.content || "").trim();
  const tags = Array.isArray(body?.tags) ? (body.tags as string[]).map((t) => String(t).trim()).filter(Boolean) : [];
  const coverImage = body?.coverImage ? String(body.coverImage) : undefined;
  const state = (body?.state === "published" ? "published" : "draft") as Post["state"];
  if (!title || !content) return NextResponse.json({ error: "Missing title or content" }, { status: 400 });

  const slug = slugify(title);
  const post = createPost({
    slug,
    title,
    content,
    tags,
    coverImage,
    authorId: user.id,
    state,
  });
  return NextResponse.json({ data: post }, { status: 201 });
}
