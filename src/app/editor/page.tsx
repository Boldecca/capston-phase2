import Container from "@/components/Container";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, getUserBySession } from "@/lib/auth";
import EditorForm from "@/components/Editor/EditorForm";

export const metadata = { title: "Editor | MediumX" };

export default function EditorPage() {    
  const token = cookies().get(SESSION_COOKIE)?.value;
  const user = getUserBySession(token);
  if (!user) redirect("/login");
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-semibold mb-6">New Post</h1>
      <EditorForm />
    </Container>
  );
}
