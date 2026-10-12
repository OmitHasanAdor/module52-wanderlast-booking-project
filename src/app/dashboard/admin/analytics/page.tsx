"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiUsers, FiMap, FiCalendar } from "react-icons/fi";

type Stats = {
  totalUsers: number;
  totalDestinations: number;
  totalBookings: number;
};

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data: tokenData, error } = await authClient.token();
        if (error || !tokenData?.token) {
          toast.error("Auth failed");
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/stats`,
          {
            headers: { authorization: `Bearer ${tokenData.token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch stats");
        setStats(await res.json());
      } catch (err) {
        console.error(err);
        toast.error("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-8">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: FiUsers,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Destinations",
      value: stats?.totalDestinations ?? 0,
      icon: FiMap,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Bookings",
      value: stats?.totalBookings ?? 0,
      icon: FiCalendar,
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Analytics
        </h1>
        <p className="mt-1 text-gray-500">Platform overview</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${card.color} shadow-md`}
              >
                <Icon className="text-xl text-white" />
              </div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="mt-1 text-3xl font-bold text-gray-800 dark:text-white">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}