"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Booking = {
  _id: string;
  destinationName?: string;
  country?: string;
  departureDate?: string;
  price?: number;
  status?: string;
  userId?: string;
};

export default function TouristBookingsPage() {
  const { data: session } = authClient.useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const userId = session?.user?.id;
        if (!userId) return;

        const { data: tokenData, error } = await authClient.token();
        if (error || !tokenData?.token) {
          toast.error("Auth failed");
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${userId}`,
          {
            headers: { authorization: `Bearer ${tokenData.token}` },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch bookings");
        setBookings(await res.json());
      } catch (err) {
        console.error(err);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) load();
    else setLoading(false);
  }, [session]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-8">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            My Bookings
          </h1>
          <p className="mt-1 text-gray-500">Your trips and status</p>
        </div>
        <Link href="/destination" className="btn btn-primary btn-sm">
          Book New Trip
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 p-10 text-center dark:border-gray-700">
          <p className="text-gray-500">No bookings yet</p>
          <Link href="/destination" className="btn btn-primary btn-sm mt-4">
            Explore Destinations
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Destination</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td className="font-medium">
                    {b.destinationName || "—"}
                    {b.country ? (
                      <span className="block text-xs text-gray-400">
                        {b.country}
                      </span>
                    ) : null}
                  </td>
                  <td className="text-sm">{b.departureDate || "—"}</td>
                  <td className="text-sm">
                    {b.price != null ? `$${b.price}` : "—"}
                  </td>
                  <td>
                    <span
                      className={`badge badge-sm ${
                        b.status === "confirmed"
                          ? "badge-success"
                          : b.status === "cancelled" || b.status === "restricted"
                            ? "badge-error"
                            : "badge-warning"
                      }`}
                    >
                      {b.status || "pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}