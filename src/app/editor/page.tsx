import Container from "@/components/Container";

import { SESSION_COOKIE, getUserBySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export const metadata = { title: "Editor | MediumX" };

export default function EditorPage() {    
  const token = cookies().get(SESSION_COOKIE)?.value;
  const user = getUserBySession(token);
  if (!user) redirect("/login");
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-semibold mb-6">New Post</h1>
      <div className="text-muted-foreground">Rich editor to be integrated in Lab 3.</div>
    </Container>
  );
}
