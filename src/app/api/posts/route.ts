import { NextRequest, NextResponse } from "next/server";
import mongoose from "@/lib/mongodb";
import Post from "@/models/Post";

// GET /api/posts - list published posts
export async function GET() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const posts = await Post.find({ published: true })
    .populate("author", "username avatarUrl")
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();
  return NextResponse.json(posts);
}

// POST /api/posts - create a post (no auth here; integrate auth separately)
export async function POST(req: NextRequest) {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const body = await req.json();
  if (!body.title || !body.content || !body.author) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const post = await Post.create(body);
  return NextResponse.json(post, { status: 201 });
}
