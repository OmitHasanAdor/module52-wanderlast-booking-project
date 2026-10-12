import { requireRole } from "@/lib/require-role";
import Link from "next/link";
import { FiUsers, FiCalendar, FiMap, FiBarChart2 } from "react-icons/fi";

export default async function AdminDashboard() {
  const user = await requireRole("admin");

  const cards = [
    {
      title: "All Users",
      description: "Manage users and roles",
      href: "/dashboard/admin/users",
      icon: FiUsers,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "All Bookings",
      description: "View all travel bookings",
      href: "/dashboard/admin/bookings",
      icon: FiCalendar,
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Destinations",
      description: "Manage destinations",
      href: "/dashboard/admin/destinations",
      icon: FiMap,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Analytics",
      description: "Platform statistics",
      href: "/dashboard/admin/analytics",
      icon: FiBarChart2,
      color: "from-orange-500 to-amber-500",
    },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Welcome back, {user.name}. Manage the platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${card.color} shadow-md`}
              >
                <Icon className="text-xl text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 transition-colors group-hover:text-[#4f39f6] dark:text-white">
                {card.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}