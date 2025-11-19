import { NextRequest, NextResponse } from "next/server";
import { deletePostBySlug, getPostBySlug, updatePostBySlug } from "@/lib/posts";

export async function GET(_: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;
    const post = await getPostBySlug(slug);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: post });
  } catch (error: any) {
    console.error("[GET /api/posts/[slug]] Error:", error);
    return NextResponse.json({ error: error?.message || "Failed to load post" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;
    const body = await req.json().catch(() => ({}));
    const patch: any = {};
    if (typeof body.title === "string") patch.title = body.title.trim();
    if (typeof body.content === "string") patch.content = body.content;
    if (Array.isArray(body.tags)) {
      patch.tags = body.tags.map((t: unknown) => (typeof t === "string" ? t.trim() : "")).filter(Boolean);
    }
    if (typeof body.coverImage === "string") patch.coverImage = body.coverImage.trim();
    if (body.state === "draft" || body.state === "published") patch.state = body.state;

    const updated = await updatePostBySlug(slug, patch);
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: updated });
  } catch (error: any) {
    console.error("[PUT /api/posts/[slug]] Error:", error);
    return NextResponse.json({ error: error?.message || "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;
    await deletePostBySlug(slug);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("[DELETE /api/posts/[slug]] Error:", error);
    return NextResponse.json({ error: error?.message || "Failed to delete post" }, { status: 500 });
  }
}
