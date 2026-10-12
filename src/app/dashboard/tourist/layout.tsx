import { requireRole } from "@/lib/require-role";
import DashboardLayout from "@/components/DashboardLayout";

export const metadata = {
  title: {
    template: "%s | Wanderlast",
    default: "My Dashboard",
  },
  robots: { index: false, follow: false },
};

export default async function TouristLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireRole("tourist");

  return (
    <DashboardLayout
      role="tourist"
      userName={user.name}
      userEmail={user.email}
    >
      {children}
    </DashboardLayout>
  );
}