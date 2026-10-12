"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Booking = {
  _id: string;
  userEmail?: string;
  userName?: string;
  destinationName?: string;
  status?: string;
  price?: number;
  departureDate?: string;
};

const STATUSES = ["pending", "confirmed", "cancelled", "restricted"] as const;

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const getToken = async () => {
    const { data, error } = await authClient.token();
    if (error || !data?.token) {
      toast.error("Auth failed");
      return null;
    }
    return data.token;
  };

  useEffect(() => {
    const load = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/all-bookings`,
          { headers: { authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Failed to fetch");
        setBookings(await res.json());
      } catch (err) {
        console.error(err);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const token = await getToken();
      if (!token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      if (!res.ok) throw new Error("Update failed");

      toast.success(`Status → ${status}`);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-8">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          All Bookings
        </h1>
        <p className="mt-1 text-gray-500">
          Confirm, cancel, or restrict bookings
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Destination</th>
              <th>User</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td className="font-medium">{b.destinationName || "—"}</td>
                <td className="text-sm text-gray-500">
                  {b.userName || b.userEmail || "—"}
                </td>
                <td className="text-sm">{b.departureDate || "—"}</td>
                <td>
                  <span className="badge badge-sm">{b.status || "pending"}</span>
                </td>
                <td>
                  <select
                    className="select select-bordered select-sm"
                    value={b.status || "pending"}
                    disabled={updatingId === b._id}
                    onChange={(e) => handleStatusChange(b._id, e.target.value)}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <p className="p-6 text-center text-gray-500">No bookings found</p>
        )}
      </div>
    </div>
  );
}