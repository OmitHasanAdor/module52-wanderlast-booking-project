"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Destination = {
  _id: string;
  destinationName?: string;
  country?: string;
  category?: string;
  price?: number;
  duration?: number;
  imageUrl?: string;
};

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/destination`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        setDestinations(await res.json());
      } catch (err) {
        console.error(err);
        toast.error("Failed to load destinations");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this destination?")) return;
    setDeletingId(id);
    try {
      const token = await getToken();
      if (!token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`,
        {
          method: "DELETE",
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Delete failed");

      toast.success("Destination deleted");
      setDestinations((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    } finally {
      setDeletingId(null);
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Destinations
          </h1>
          <p className="mt-1 text-gray-500">Manage travel packages</p>
        </div>
        <Link
          href="/dashboard/admin/add-destination"
          className="btn btn-primary btn-sm"
        >
          Add Destination
        </Link>
      </div>

      {destinations.length === 0 ? (
        <p className="text-center text-gray-500">No destinations yet</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Package</th>
                <th>Country</th>
                <th>Category</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((d) => (
                <tr key={d._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      {d.imageUrl ? (
                        <Image
                          src={d.imageUrl}
                          alt={d.destinationName || ""}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-gray-200" />
                      )}
                      <span className="font-medium">
                        {d.destinationName || "—"}
                      </span>
                    </div>
                  </td>
                  <td className="text-sm">{d.country || "—"}</td>
                  <td className="text-sm">{d.category || "—"}</td>
                  <td className="text-sm">
                    {d.price != null ? `$${d.price}` : "—"}
                  </td>
                  <td className="text-sm">
                    {d.duration != null ? `${d.duration} days` : "—"}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        href={`/destination/${d._id}`}
                        className="btn btn-ghost btn-xs"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        className="btn btn-error btn-xs"
                        disabled={deletingId === d._id}
                        onClick={() => handleDelete(d._id)}
                      >
                        {deletingId === d._id ? "..." : "Delete"}
                      </button>
                    </div>
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