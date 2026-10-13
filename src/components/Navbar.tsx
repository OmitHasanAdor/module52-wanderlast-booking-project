"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/3675/3675805.png";

type NavLink = { href: string; label: string };

const Navbar = () => {
  const { data, isPending } = authClient.useSession();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const user = data?.user;
  const role = (user as any)?.role || "tourist";

  const publicLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/destination", label: "Destinations" },
  ];

  const authLinks: NavLink[] = [];
  if (user) {
    authLinks.push({ href: "/mybooking", label: "My Bookings" });
    authLinks.push({
      href: role === "admin" ? "/dashboard/admin" : "/dashboard/tourist",
      label: "Dashboard",
    });
    authLinks.push({ href: "/profile", label: "Profile" });
    if (role === "admin") {
      authLinks.push({
        href: "/dashboard/admin/add-destination",
        label: "Add Destination",
      });
    }
  }

  const navLinks = [...publicLinks, ...authLinks];

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  const showAuth = mounted && !isPending;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/80 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/assets/Wanderlast.png"
            alt="Wanderlast"
            width={110}
            height={40}
            priority
            className="h-5 w-auto object-contain"
          />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "bg-linear-to-r from-[#4f39f6]/10 to-[#9514fa]/10 text-[#4f39f6]"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {!showAuth ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 sm:flex">
                <Image
                  src={user.image || DEFAULT_AVATAR}
                  alt={user.name ?? "User"}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full border border-gray-200 object-cover"
                />
                <span className="max-w-25 truncate text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user.name?.split(" ")[0]}
                </span>
              </div>
              <button
                type="button"
                onClick={() => authClient.signOut()}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-linear-to-r from-[#4f39f6] to-[#9514fa] px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                Sign Up
              </Link>
            </div>
          )}

          <button
            type="button"
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden dark:text-gray-300 dark:hover:bg-gray-800"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 md:hidden dark:border-gray-800 dark:bg-gray-950">
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive(href)
                      ? "bg-violet-50 text-[#4f39f6]"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-200"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;