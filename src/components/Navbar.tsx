'use client';

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
    href: string;
    label: string;
}

const NAV_LINKS: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/destination", label: "Destinations" },
    { href: "/mybooking", label: "My Bookings" },
    { href: "/add-destination", label: "Add Destination" },
];

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/3675/3675805.png";

const Navbar = () => {
    const { data, isPending } = authClient.useSession();
    const pathname = usePathname();
    const user = data?.user;

    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-sm sticky top-0 z-50">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
                <Image
                    src="/assets/Wanderlast.png"
                    alt="Wanderlast Logo"
                    width={110}
                    height={50}
                    priority
                    className="h-10 w-auto object-contain"
                />
            </Link>

            {/* Main nav links */}
            <ul className="hidden md:flex items-center gap-6 font-medium text-gray-700">
                {NAV_LINKS.map(({ href, label }) => {
                    const isActive = pathname === href;
                    return (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`transition-colors hover:text-blue-600 ${
                                    isActive ? "text-blue-600 font-semibold" : ""
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
                <Link
                    href="/profile"
                    className="hidden sm:block font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                    Profile
                </Link>

                {isPending ? (
                    <div className="h-9 w-24 rounded-md bg-gray-200 animate-pulse" />
                ) : user ? (
                    <div className="flex items-center gap-3">
                        <span className="hidden sm:inline text-gray-700 font-medium">
                            Hi, {user.name?.split(" ")[0]}
                        </span>
                        <Image
                            src={user.image || DEFAULT_AVATAR}
                            alt={user.name ?? "User avatar"}
                            width={36}
                            height={36}
                            className="rounded-full h-9 w-9 object-cover border border-gray-200"
                        />
                        <button
                            onClick={() => authClient.signOut()}
                            className="btn btn-outline btn-sm cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="btn btn-primary btn-sm"
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;