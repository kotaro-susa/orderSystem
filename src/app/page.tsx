import LoginForm from "./components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session) {
    return redirect("/dashboard");
  }
  return (
    <main>
      <LoginForm />
    </main>
  );
}
