import { NextResponse } from "next/server";
import { SESSION_COOKIE, createSession, createUser, getUserByEmail } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const password = String(body?.password || "").trim();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = getUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "Email is already registered" }, { status: 409 });
    }

    const user = createUser(name, email, password);
    const token = createSession(user.id);

    const res = NextResponse.json({ data: { user } }, { status: 200 });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });
    return res;
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
