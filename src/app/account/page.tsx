import Container from "@/components/Container";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, getUserBySession } from "@/lib/auth";

export const metadata = {
  title: "Account | MediumX",
};

export default function AccountPage() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const user = getUserBySession(token);
  if (!user) redirect("/login");
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-semibold mb-4">Your Account</h1>
      <div className="space-y-2 text-sm">
        <div><span className="opacity-70">Name:</span> {user.name}</div>
        <div><span className="opacity-70">Email:</span> {user.email}</div>
      </div>
    </Container>
  );
}
