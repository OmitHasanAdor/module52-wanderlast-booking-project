import DestinationCard, { Destination } from "@/components/DestinationCard";
import Link from "next/link";

async function getFeaturedDestinations(): Promise<Destination[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    const list: Destination[] = Array.isArray(data)
      ? data
      : data?.destinations ?? data?.destination ?? [];

    return list.slice(0, 6);
  } catch (err) {
    console.error("Failed to fetch featured destinations:", err);
    return [];
  }
}

export default async function FeaturedDestinations() {
  const destinations = await getFeaturedDestinations();

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Featured Destinations
        </h2>
        <p className="mt-2 text-gray-500">
          Hand-picked trips our travelers love most.
        </p>
      </div>

      {destinations.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          <p>No destinations available right now. Please check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest) => (
            <DestinationCard key={dest._id} dest={dest} />
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <Link
          href="/destination"
          className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-cyan-500/25 transition hover:scale-[1.03] hover:shadow-cyan-500/40"
        >
          All Destinations
        </Link>
      </div>
    </section>
  );
}