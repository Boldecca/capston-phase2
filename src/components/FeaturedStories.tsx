import Link from "next/link";
import Image from "next/image";

const stories = [
  {
    title: "Getting Started with Next.js",
    excerpt:
      "Learn the fundamentals of Next.js and build your first full-stack application.",
    author: "Sarah Chen",
    date: "Nov 14, 2025",
    read: "5 min read",
    tag: "Next.js",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/next-js-development-modern-workspace-Fb7MnZVVq6SuxtiE1cK3MHBWkh9vBz.jpg",
  },
  {
    title: "The Future of Web Development",
    excerpt:
      "Exploring emerging trends and technologies shaping the web in 2025.",
    author: "Alex Johnson",
    date: "Nov 13, 2025",
    read: "6 min read",
    tag: "Trending",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/future-technology-digital-landscape-36ibjVoESvJqYlf5S8mIRoBad4s5Go.jpg",
  },
  {
    title: "TypeScript Best Practices",
    excerpt:
      "Master advanced TypeScript patterns for scalable applications.",
    author: "Jordan Lee",
    date: "Nov 12, 2025",
    read: "10 min read",
    tag: "TypeScript",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/typescript-code-programming-G19xlvtC0F13l8qK5GDLI8tbqb6Rzt.jpg",
  },
] as const;

export default function FeaturedStories() {
  return (
    <section className="py-10">
      <h2 className="mb-1 text-2xl font-semibold">Featured Stories</h2>
      <p className="mb-6 text-sm text-muted-foreground max-w-2xl">
        Discover the latest and most popular posts from our community
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((s) => (
          <article
            key={s.title}
            className="rounded-lg border p-4 transition-colors hover:bg-black/[.02] dark:hover:bg-white/[.03]"
          >
            <Link href="/posts" className="block">
              <div className="relative mb-3 overflow-hidden rounded-md border">
                <div className="absolute left-2 top-2 z-10 rounded-full bg-background/90 px-2 py-1 text-xs font-medium">
                  {s.tag}
                </div>
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="mb-1 text-base font-semibold">{s.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{s.excerpt}</p>
            </Link>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="relative h-6 w-6 overflow-hidden rounded-full bg-zinc-200">
                  <Image src="/logo.svg" alt="avatar" fill className="object-cover" />
                </div>
                <span>{s.author}</span>
              </div>
              <div className="flex items-center gap-2 opacity-80">
                <span>{s.date}</span>
                <span>•</span>
                <span>{s.read}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
