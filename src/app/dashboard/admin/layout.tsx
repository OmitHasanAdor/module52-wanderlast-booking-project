import { requireRole } from "@/lib/require-role";
import DashboardLayout from "@/components/DashboardLayout";

export const metadata = {
  title: {
    template: "%s | Wanderlast Admin",
    default: "Admin Dashboard",
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireRole("admin");

  return (
    <DashboardLayout
      role="admin"
      userName={user.name}
      userEmail={user.email}
    >
      {children}
    </DashboardLayout>
  );
}