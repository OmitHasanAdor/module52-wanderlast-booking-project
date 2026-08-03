import Banner from "@/components/Banner";
import DestinationCard, { Destination } from "@/components/DestinationCard";
import Link from "next/link";

async function getFeaturedDestinations(): Promise<Destination[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destinations?limit=6`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) return [];

        const data = await res.json();
        return Array.isArray(data) ? data : data?.destinations ?? [];
    } catch (err) {
        console.error("Failed to fetch featured destinations:", err);
        return [];
    }
}

export default async function Home() {
    const destinations = await getFeaturedDestinations();

    return (
        <div>
            <Banner />

            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Featured Destinations
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Hand-picked trips our travelers love most.
                        </p>
                    </div>
                    <Link
                        href="/destination"
                        className="hidden md:block text-cyan-600 font-semibold hover:text-cyan-700 transition-colors"
                    >
                        View All →
                    </Link>
                </div>

                {destinations.length === 0 ? (
                    <div className="text-center py-16 text-gray-500">
                        <p>No destinations available right now. Please check back soon.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {destinations.map((dest) => (
                            <DestinationCard key={dest._id} dest={dest} />
                        ))}
                    </div>
                )}

                <div className="mt-10 text-center md:hidden">
                    <Link
                        href="/destination"
                        className="inline-block text-cyan-600 font-semibold hover:text-cyan-700 transition-colors"
                    >
                        View All Destinations →
                    </Link>
                </div>
            </section>
        </div>
    );
}