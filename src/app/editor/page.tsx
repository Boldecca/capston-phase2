import EditorClient from "@/components/Editor/EditorClient";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata = { title: "Editor | MediumX" };

export default async function EditorPage() {
  const token = cookies().get("SESSION_COOKIE")?.value ?? null;
  if (!token) redirect("/login");
  
  return <EditorClient />;
}
