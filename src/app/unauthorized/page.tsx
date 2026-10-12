import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Access Denied</h1>
      <p className="text-gray-500">You do not have permission to view this page.</p>
      <Link href="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
}