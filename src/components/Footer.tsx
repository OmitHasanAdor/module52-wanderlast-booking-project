'use client';

import Link from "next/link";
import { useState, FormEvent } from "react";
import { FiTwitter, FiLinkedin, FiInstagram, FiArrowUpRight } from "react-icons/fi";

interface FooterLink {
    label: string;
    href: string;
}

const QUICK_LINKS: FooterLink[] = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destination" },
    { label: "My Bookings", href: "/mybooking" },
    { label: "My Profile", href: "/profile" },
];

const SUPPORT_LINKS: FooterLink[] = [
    { label: "Help Center", href: "/help" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
];

const Footer = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.trim()) return;
        // TODO: connect to actual newsletter API
        setSubmitted(true);
        setEmail("");
    };

    return (
        <footer className="bg-black text-gray-400 px-6 md:px-16 py-16 mt-10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-6xl md:text-7xl font-bold text-white">
                        Wanderlast
                    </h1>
                    <p className="mt-4 max-w-xl">
                        Your gateway to extraordinary travel experiences around the world.
                    </p>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white mb-3 tracking-wide text-sm font-semibold">
                            NEWSLETTER
                        </h3>
                        <p className="mb-4 text-sm">
                            Subscribe for exclusive travel deals and inspiration.
                        </p>

                        <form
                            onSubmit={handleSubscribe}
                            className="flex items-center bg-gray-800 px-4 py-3 rounded-md focus-within:ring-1 focus-within:ring-gray-500 transition-shadow"
                        >
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                                aria-label="Email address"
                                className="bg-transparent outline-none flex-1 text-sm text-white placeholder:text-gray-500"
                            />
                            <button
                                type="submit"
                                aria-label="Subscribe"
                                className="text-white text-lg hover:text-blue-400 transition-colors cursor-pointer"
                            >
                                <FiArrowUpRight size={18} />
                            </button>
                        </form>
                        {submitted && (
                            <p className="mt-2 text-xs text-green-400">
                                Thanks for subscribing!
                            </p>
                        )}
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white mb-3 tracking-wide text-sm font-semibold">
                            QUICK LINKS
                        </h3>
                        <ul className="space-y-2">
                            {QUICK_LINKS.map(({ label, href }) => (
                                <li key={href}>
                                    <Link href={href} className="hover:text-white transition-colors">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white mb-3 tracking-wide text-sm font-semibold">
                            SUPPORT
                        </h3>
                        <ul className="space-y-2">
                            {SUPPORT_LINKS.map(({ label, href }) => (
                                <li key={href}>
                                    <Link href={href} className="hover:text-white transition-colors">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white mb-3 tracking-wide text-sm font-semibold">
                            CONTACT US
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="tel:+17869011622" className="hover:text-white transition-colors">
                                    +1 786 901 1622
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@wanderlast.com" className="hover:text-white transition-colors">
                                    info@wanderlast.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm">
                        © {new Date().getFullYear()} Wanderlast. All rights reserved.
                    </p>

                    <div className="flex gap-5 text-white text-lg">
                        <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors">
                            <FiTwitter size={18} />
                        </a>
                        <a href="#" aria-label="LinkedIn" className="hover:text-blue-400 transition-colors">
                            <FiLinkedin size={18} />
                        </a>
                        <a href="#" aria-label="Instagram" className="hover:text-pink-400 transition-colors">
                            <FiInstagram size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;