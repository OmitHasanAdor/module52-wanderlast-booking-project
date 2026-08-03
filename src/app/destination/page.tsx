import DestinationCard, { Destination } from "@/components/DestinationCard";

interface DestinationPageProps {
    searchParams: Promise<{
        location?: string;
        duration?: string;
        budget?: string;
        people?: string;
    }>;
}

async function getDestinations(): Promise<Destination[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) return [];

        const data = await res.json();
        return Array.isArray(data) ? data : data?.destinations ?? [];
    } catch (err) {
        console.error("Failed to fetch destinations:", err);
        return [];
    }
}

const DestinationPage = async ({ searchParams }: DestinationPageProps) => {
    const params = await searchParams;
    const allDestinations = await getDestinations();

    const filteredDestinations = allDestinations.filter((dest) => {
        if (params.location) {
            const query = params.location.toLowerCase();
            const matchesLocation =
                dest.country?.toLowerCase().includes(query) ||
                dest.destinationName?.toLowerCase().includes(query);
            if (!matchesLocation) return false;
        }

        if (params.budget) {
            const maxBudget = Number(params.budget);
            if (!Number.isNaN(maxBudget) && dest.price > maxBudget) return false;
        }

        return true;
    });

    return (
        <div className="max-w-7xl mx-auto p-5">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Explore Destinations
                </h1>
                <p className="text-gray-500 mt-2">
                    {filteredDestinations.length} destination
                    {filteredDestinations.length !== 1 ? "s" : ""} found
                    {params.location ? ` for "${params.location}"` : ""}
                </p>
            </div>

            {filteredDestinations.length === 0 ? (
                <div className="text-center py-24 text-gray-500">
                    <p className="text-lg font-medium">No destinations found</p>
                    <p className="text-sm mt-1">Try adjusting your search filters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDestinations.map((dest) => (
                        <DestinationCard key={dest._id} dest={dest} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DestinationPage;