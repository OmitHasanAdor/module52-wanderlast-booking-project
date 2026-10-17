"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  FiHome,
  FiCalendar,
  FiUser,
  FiSettings,
  FiLogOut,
  FiUsers,
  FiPlusCircle,
  FiBarChart2,
  FiMap,
} from "react-icons/fi";
import { FaPlane } from "react-icons/fa";

const menuItems: Record<
  string,
  { name: string; href: string; icon: React.ElementType }[]
> = {
  tourist: [
    { name: "Dashboard", href: "/dashboard/tourist", icon: FiHome },
    { name: "My Bookings", href: "/dashboard/tourist/bookings", icon: FiCalendar },
    { name: "Destinations", href: "/destination", icon: FiMap },
    { name: "Profile", href: "/profile", icon: FiUser },
  ],
  admin: [
    { name: "Dashboard", href: "/dashboard/admin", icon: FiHome },
    { name: "All Users", href: "/dashboard/admin/users", icon: FiUsers },
    { name: "All Bookings", href: "/dashboard/admin/bookings", icon: FiCalendar },
    { name: "Destinations", href: "/dashboard/admin/destinations", icon: FiMap },
    { name: "Add Destination", href: "/dashboard/admin/add-destination", icon: FiPlusCircle },
    { name: "Analytics", href: "/dashboard/admin/analytics", icon: FiBarChart2 },
    { name: "Settings", href: "/dashboard/admin/settings", icon: FiSettings },
  ],
};

type SidebarProps = {
  role?: string;
  userName?: string;
  userEmail?: string;
  onNavigate?: () => void;
};

const Sidebar = ({
  role = "tourist",
  userName = "User",
  userEmail = "",
  onNavigate,
}: SidebarProps) => {
  const pathname = usePathname();
  const items = menuItems[role] || menuItems.tourist;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
            router.push("/login");
          },
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <aside className="flex h-full min-h-screen w-full flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-5 dark:border-gray-800">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#4f39f6] to-[#9514fa] shadow-md">
          <FaPlane className="text-lg text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            Wanderlast
          </h2>
          <p className="text-xs capitalize text-gray-500 dark:text-gray-400">
            {role} Panel
          </p>
        </div>
      </div>

      {/* User */}
      <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
        <p className="truncate text-sm font-semibold text-gray-800 dark:text-white">
          {userName}
        </p>
        <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
          {userEmail}
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {items.map((item) => {
          const isActive =
            item.href === `/dashboard/${role}`
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href} onClick={onNavigate}>
              <div
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-linear-to-r from-[#4f39f6] to-[#9514fa] text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-100 px-3 py-4 dark:border-gray-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <FiLogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;