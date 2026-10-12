"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}

export default function RoleGuard({
  children,
  allowedRoles,
  redirectTo = "/",
}: RoleGuardProps) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/login"); // তোমার login route
      return;
    }

    const role = (session.user as any).role || "tourist";

    if (!allowedRoles.includes(role)) {
      router.replace(redirectTo);
    }
  }, [session, isPending, allowedRoles, redirectTo, router]);

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!session?.user) return null;

  const role = (session.user as any).role || "tourist";
  if (!allowedRoles.includes(role)) return null;

  return <>{children}</>;
}