import Container from "@/components/Container";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return { title: `${params.slug} | MediumX` };
}

export default function PostDetailPage({ params }: { params: { slug: string } }) {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-semibold mb-4">Post: {params.slug}</h1>
      <article className="prose dark:prose-invert max-w-none">Content coming soon.</article>
    </Container>
  );
}
