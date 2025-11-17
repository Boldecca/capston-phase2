"use client";
import Container from "@/components/Container";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import EditorClient from "@/components/Editor/EditorClient";

import { SESSION_COOKIE, getUserBySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { useState } from "react";
export const metadata = { title: "Editor | MediumX" };

export default async function EditorPage() {
  // server-side: read cookie and validate session
  const token = cookies().get("SESSION_COOKIE")?.value ?? null;

  // optionally call your server-side session check if you have one:
  // const user = token ? await getUserBySession(token) : null;
  // if (!user) redirect("/login");

  // simple check: require token presence
  if (!token) redirect("/login");

  // render client editor (client component must handle UI/state)
  return <EditorClient />;
}
