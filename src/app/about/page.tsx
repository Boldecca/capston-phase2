import Container from "@/components/Container";

export const metadata = {
  title: "About | MediumX",
};

export default function AboutPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-semibold mb-4">About</h1>
      <p className="text-muted-foreground max-w-2xl">
        MediumX is a simple publishing platform built with Next.js for your capstone.
      </p>
    </Container>
  );
}
