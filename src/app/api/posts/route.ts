import { NextRequest, NextResponse } from "next/server";
import { createPostRecord, ensureUniqueSlug, getPublishedPosts } from "@/lib/posts";

export async function GET() {
  try {
    const posts = await getPublishedPosts();
    return NextResponse.json({ data: posts });
  } catch (error: any) {
    console.error("[GET /api/posts] Error:", error);
    return NextResponse.json({ error: error?.message || "Failed to load posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const content = typeof body?.content === "string" ? body.content.trim() : "";
    const tags = Array.isArray(body?.tags)
      ? body.tags
          .map((tag) => (typeof tag === "string" ? tag.trim() : ""))
          .filter(Boolean)
      : [];
    const state = body?.state === "published" ? "published" : "draft";
    const coverImage = typeof body?.coverImage === "string" ? body.coverImage.trim() : undefined;
    const authorId = typeof body?.authorId === "string" ? body.authorId : null;
    const slugSource = typeof body?.slug === "string" ? body.slug.trim() : title;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const slug = await ensureUniqueSlug(slugSource);
    const post = await createPostRecord({
      title,
      content,
      tags,
      state,
      coverImage,
      authorId,
      slug,
    });

    return NextResponse.json({ data: post }, { status: 201 });
  } catch (error: any) {
    console.error("[POST /api/posts] Error:", error);
    return NextResponse.json({ error: error?.message || "Failed to create post" }, { status: 500 });
  }
}
