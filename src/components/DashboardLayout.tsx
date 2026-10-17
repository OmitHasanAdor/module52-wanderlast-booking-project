"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Menu, X } from "lucide-react";

type Props = {
  children: React.ReactNode;
  role?: string;
  userName?: string;
  userEmail?: string;
};

export default function DashboardLayout({
  children,
  role = "tourist",
  userName = "User",
  userEmail = "",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ===== Desktop sidebar (md+) ===== */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:block">
        <Sidebar role={role} userName={userName} userEmail={userEmail} />
      </aside>

      {/* ===== Mobile overlay ===== */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ===== Mobile drawer ===== */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 bg-white transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          role={role}
          userName={userName}
          userEmail={userEmail}
          onNavigate={() => setOpen(false)}
        />
      </aside>

      {/* ===== Main content ===== */}
      <div className="md:pl-64">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 md:hidden dark:border-gray-800 dark:bg-gray-900">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          <span className="text-sm font-semibold text-gray-800 dark:text-white">
            {role === "admin" ? "Admin Panel" : "My Dashboard"}
          </span>
        </div>

        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}