import { requireRole } from "@/lib/require-role";
import Link from "next/link";
import { FiCalendar, FiMap } from "react-icons/fi";

export default async function TouristDashboard() {
  const user = await requireRole("tourist");

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">
          Welcome, {user.name}
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Manage your trips from here.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Link
          href="/dashboard/tourist/bookings"
          className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-purple-500 to-indigo-500 shadow-md">
            <FiCalendar className="text-xl text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            My Bookings
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your trips
          </p>
        </Link>

        <Link
          href="/destination"
          className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 shadow-md">
            <FiMap className="text-xl text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Explore Destinations
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Find your next adventure
          </p>
        </Link>
      </div>
    </div>
  );
}