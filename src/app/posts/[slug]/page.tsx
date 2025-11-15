import Container from "@/components/Container";
import Image from "next/image";
import { getPostBySlug } from "@/lib/store";
import { renderMarkdown } from "@/components/Editor/markdown-utils";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return { title: `${params.slug} | MediumX` };
}

export default function PostDetailPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return (
      <Container className="py-10">
        <h1 className="text-3xl font-semibold mb-4">Not found</h1>
        <div className="text-muted-foreground">We couldn't find this post.</div>
      </Container>
    );
  }
  return (
    <Container className="py-10">
      <div className="mb-2 text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()} • {post.state}</div>
      <h1 className="text-3xl font-semibold mb-4">{post.title}</h1>
      {post.tags.length ? (
        <div className="mb-4 flex flex-wrap gap-1">
          {post.tags.map((t) => (
            <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-xs">{t}</span>
          ))}
        </div>
      ) : null}
      {post.coverImage ? (
        <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-md border">
          <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 1024px) 100vw, 800px" className="object-cover" />
        </div>
      ) : null}
      <article className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
    </Container>
  );
}
