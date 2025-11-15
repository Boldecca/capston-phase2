import Container from "@/components/Container";
import Link from "next/link";
import Image from "next/image";
import { listPosts } from "@/lib/store";

export const metadata = {
  title: "Posts | MediumX",
};

export default function PostsPage() {
  const posts = listPosts();
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-semibold mb-6">Latest Posts</h1>
      {posts.length === 0 ? (
        <div className="text-muted-foreground">No posts yet. Create one from the editor.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.id} className="rounded-lg border p-4 transition-colors hover:bg-black/[.02] dark:hover:bg-white/[.03]">
              <Link href={`/posts/${p.slug}`} className="block">
                {p.coverImage ? (
                  <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-md border">
                    <Image src={p.coverImage} alt={p.title} fill sizes="(max-width: 1024px) 100vw, 400px" className="object-cover" />
                  </div>
                ) : null}
                <h3 className="mb-1 text-base font-semibold">{p.title}</h3>
                {p.tags.length ? (
                  <div className="mb-2 flex flex-wrap gap-1">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-xs">{t}</span>
                    ))}
                  </div>
                ) : null}
                <div className="text-xs text-muted-foreground">{new Date(p.createdAt).toLocaleDateString()} • {p.state}</div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </Container>
  );
}
