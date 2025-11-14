import Container from "@/components/Container";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, getUserBySession } from "@/lib/auth";

export const metadata = { title: "Editor | MediumX" };

export default async function EditorPage() {
  const cookieStore = cookies() as any;
  const store = typeof (cookieStore as Promise<any>)?.then === "function" ? (await cookieStore) : cookieStore;
  const token = store.get(SESSION_COOKIE)?.value as string | undefined;
  const user = getUserBySession(token);
  if (!user) redirect("/login");
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-semibold mb-6">New Post</h1>
      <div className="text-muted-foreground">Rich editor to be integrated in Lab 3.</div>
    </Container>
  );
}
