import Container from "@/components/Container";

export const metadata = { title: "Editor | MediumX" };

export default function EditorPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-semibold mb-6">New Post</h1>
      <div className="text-muted-foreground">Rich editor to be integrated in Lab 3.</div>
    </Container>
  );
}
