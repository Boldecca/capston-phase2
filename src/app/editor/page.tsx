import Container from "@/components/Container";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, getUserBySession } from "@/lib/auth";
import { RichEditor, ImageUploader } from "@/components/Editor";

export const metadata = { title: "Editor | MediumX" };

export default async function EditorPage() {
  const cookieStore = cookies() as any;
  const store = typeof (cookieStore as Promise<any>)?.then === "function" ? (await cookieStore) : cookieStore;
  const token = store.get(SESSION_COOKIE)?.value as string | undefined;
  const user = getUserBySession(token);
  if (!user) redirect("/login");
  return (
    <Container className="py-12">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 bg-clip-text text-transparent">
            New Post
          </h1>
          <p className="text-sm text-muted-foreground">Rich editor to be integrated in Lab 3.</p>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-primary/10 to-transparent blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground transition-colors group-hover:bg-muted/80">Draft</span>
              <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground transition-colors group-hover:bg-muted/80">Autosave off</span>
            </div>

            <div className="space-y-3">
              <div className="h-10 rounded-lg border bg-background/50 px-3 py-2 text-sm text-muted-foreground ring-0 transition-shadow focus-within:ring-2 focus-within:ring-primary/30">
                <div className="truncate">Post title</div>
              </div>
              <RichEditor />
            </div>

            <div className="mt-6">
              <h3 className="mb-2 text-sm font-medium">Images</h3>
              <ImageUploader />
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/60">
                Save draft
              </button>
              <button className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-90 transition-all hover:opacity-100 hover:shadow-md">
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
