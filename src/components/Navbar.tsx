"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
}

const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/3675/3675805.png";

const Navbar = () => {
  const { data, isPending } = authClient.useSession();
  const pathname = usePathname();
  const user = data?.user;
  const role = (user as any)?.role || "tourist";

  // Public links
  const publicLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/destination", label: "Destinations" },
  ];

  // Logged-in links (role based)
  const authLinks: NavLink[] = [];

if (user) {
  authLinks.push({ href: "/mybooking", label: "My Bookings" });

  // Dashboard — role অনুসারে
  authLinks.push({
    href: role === "admin" ? "/dashboard/admin" : "/dashboard/tourist",
    label: "Dashboard",
  });

  // Add Destination — শুধু admin
  if (role === "admin") {
    authLinks.push({
      href: "/dashboard/admin/add-destination",
      label: "Add Destination",
    });
  }
}

  const navLinks = [...publicLinks, ...authLinks];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-6 py-3 shadow-sm">
      {/* Logo */}
      <Link href="/" className="flex shrink-0 items-center">
        <Image
          src="/assets/Wanderlast.png"
          alt="Wanderlast Logo"
          width={200}
          height={200}
          priority
          className="h-5 w-auto object-contain"
        />
      </Link>

      {/* Main nav links */}
      <ul className="hidden items-center gap-6 font-medium text-gray-700 md:flex">
        {navLinks.map(({ href, label }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(href + "/");

          return (
            <li key={href}>
              <Link
                href={href}
                className={`transition-colors hover:text-blue-600 ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Right side: auth / profile */}
      <div className="flex items-center gap-4">
        {user && (
          <Link
            href="/profile"
            className="hidden font-medium text-gray-700 transition-colors hover:text-blue-600 sm:block"
          >
            Profile
          </Link>
        )}

        {isPending ? (
          <div className="h-9 w-24 animate-pulse rounded-md bg-gray-200" />
        ) : user ? (
          <div className="flex items-center gap-3">
            <span className="hidden font-medium text-gray-700 sm:inline">
              Hi, {user.name?.split(" ")[0]}
            </span>
            <Image
              src={user.image || DEFAULT_AVATAR}
              alt={user.name ?? "User avatar"}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full border border-gray-200 object-cover"
            />
            <button
              onClick={() => authClient.signOut()}
              className="btn btn-outline btn-sm cursor-pointer transition-colors hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              Login
            </Link>
            <Link href="/signup" className="btn btn-primary btn-sm">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;