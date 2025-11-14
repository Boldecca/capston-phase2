import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, getUserBySession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const user = getUserBySession(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ data: { user } });
}
