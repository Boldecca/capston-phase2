import Container from "@/components/Container";

export const metadata = {
  title: "Account | MediumX",
};

export default function AccountPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-semibold mb-4">Your Account</h1>
      <p className="text-muted-foreground">Protected page. Auth will be added in Lab 2.</p>
    </Container>
  );
}
