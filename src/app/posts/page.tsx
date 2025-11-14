import Container from "@/components/Container";

export const metadata = {
  title: "Posts | MediumX",
};

export default function PostsPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-semibold mb-6">Latest Posts</h1>
      <div className="text-muted-foreground">No posts yet. Come back soon.</div>
    </Container>
  );
}
