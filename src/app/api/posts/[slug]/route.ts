import { NextRequest, NextResponse } from "next/server";
import { deletePost, getPostBySlug, updatePost } from "@/lib/store";

export async function GET(_: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const post = getPostBySlug(slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: post });
}

export async function PUT(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const current = getPostBySlug(slug);
  if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const body = await req.json().catch(() => ({}));
  const patch: any = {};
  if (typeof body.title === "string") patch.title = body.title;
  if (typeof body.content === "string") patch.content = body.content;
  if (Array.isArray(body.tags)) patch.tags = body.tags;
  if (typeof body.coverImage === "string") patch.coverImage = body.coverImage;
  if (body.state === "draft" || body.state === "published") patch.state = body.state;
  const updated = updatePost(current.id, patch);
  return NextResponse.json({ data: updated });
}

export async function DELETE(_: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const current = getPostBySlug(slug);
  if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });
  deletePost(current.id);
  return NextResponse.json({ ok: true });
}
