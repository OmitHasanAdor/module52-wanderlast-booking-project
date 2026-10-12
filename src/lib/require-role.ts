import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function requireRole(requiredRole: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const role = (session.user as any).role || "tourist";

  if (role !== requiredRole) {
    console.warn(
      `Access Denied. Required: ${requiredRole}, Found: ${role} (user: ${session.user.email})`
    );
    redirect("/unauthorized");
  }

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role,
  };
}