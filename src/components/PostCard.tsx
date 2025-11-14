import Link from "next/link";

type Props = {
  title: string;
  excerpt?: string;
  slug: string;
  author?: string;
  date?: string;
};

export default function PostCard({ title, excerpt, slug, author, date }: Props) {
  return (
    <article className="border rounded-lg p-4 hover:shadow-sm transition">
      <h3 className="text-xl font-semibold mb-2">
        <Link href={`/posts/${slug}`}>{title}</Link>
      </h3>
      {excerpt && <p className="text-sm text-muted-foreground mb-3">{excerpt}</p>}
      <div className="text-xs text-muted-foreground flex gap-2">
        {author && <span>By {author}</span>}
        {date && <span>• {new Date(date).toLocaleDateString()}</span>}
      </div>
    </article>
  );
}
