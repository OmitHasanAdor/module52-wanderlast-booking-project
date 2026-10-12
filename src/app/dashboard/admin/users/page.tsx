"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type AppUser = {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  banned?: boolean;
  banReason?: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const getToken = async () => {
    const { data, error } = await authClient.token();
    if (error || !data?.token) {
      toast.error("Auth failed. Please login again.");
      return null;
    }
    return data.token;
  };

  const fetchUsers = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
        headers: { authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBanToggle = async (user: AppUser) => {
    const id = user._id || user.id;
    if (!id) return;

    const willBan = !user.banned;
    setUpdatingId(id);

    try {
      const token = await getToken();
      if (!token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${id}/ban`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            banned: willBan,
            banReason: willBan ? "Banned by admin" : "",
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update ban status");

      toast.success(willBan ? "User banned" : "User unbanned");
      setUsers((prev) =>
        prev.map((u) =>
          (u._id || u.id) === id
            ? {
                ...u,
                banned: willBan,
                banReason: willBan ? "Banned by admin" : "",
              }
            : u
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update ban status");
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
          All Users
        </h1>
        <p className="mt-1 text-gray-500">
          Ban or unban users. Roles are managed from the database only.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <table className="table w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
              <th className="text-left">Status</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const id = user._id || user.id || "";
              const isBanned = !!user.banned;
              const isAdmin = user.role === "admin";

              return (
                <tr
                  key={id}
                  className="border-b border-gray-50 dark:border-gray-800"
                >
                  <td className="font-medium">{user.name || "—"}</td>
                  <td className="text-sm text-gray-500">{user.email}</td>
                  <td>
                    <span
                      className={`badge badge-sm ${
                        isAdmin ? "badge-primary" : "badge-ghost"
                      }`}
                    >
                      {user.role || "tourist"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge badge-sm ${
                        isBanned ? "badge-error" : "badge-success"
                      }`}
                    >
                      {isBanned ? "Banned" : "Active"}
                    </span>
                  </td>
                  <td>
                    {/* Admin নিজেকে ban করতে পারবে না */}
                    {isAdmin ? (
                      <span className="text-xs text-gray-400">—</span>
                    ) : (
                      <button
                        type="button"
                        className={`btn btn-sm ${
                          isBanned ? "btn-success" : "btn-error"
                        }`}
                        disabled={updatingId === id}
                        onClick={() => handleBanToggle(user)}
                      >
                        {updatingId === id
                          ? "..."
                          : isBanned
                            ? "Unban"
                            : "Ban"}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="p-6 text-center text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
}