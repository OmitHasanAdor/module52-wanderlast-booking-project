import BookingCard from "@/components/BookingCard";
import DeleteDestination from "@/components/DeleteDestination";
import EditModal from "@/components/EditModal";
import { auth } from "@/lib/auth";
import { Calendar, MapPin } from "@gravity-ui/icons";
import { headers } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Destination } from "@/components/DestinationCard";

interface BookingDetailsPageProps {
    params: Promise<{ id: string }>;
}

const BookingDetailsPage = async ({ params }: BookingDetailsPageProps) => {
    const { id } = await params;

    const tokenResult = await auth.api.getToken({
        headers: await headers(),
    });
    const token = tokenResult?.token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        notFound();
    }

    const destination: Destination = await res.json();
    const { country, price, duration, description, destinationName, imageUrl } = destination;

    return (
        <div className="rounded-2xl shadow-lg max-w-5xl mx-auto my-10 bg-white overflow-hidden">
            <div className="relative">
                <Image
                    src={imageUrl}
                    alt={destinationName}
                    width={1000}
                    height={500}
                    priority
                    className="w-full h-80 md:h-96 object-cover"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 p-6 md:p-10 gap-8">
                {/* Left: details */}
                <div className="space-y-5 md:col-span-2">
                    <span className="flex items-center gap-2 text-gray-500 text-sm">
                        <MapPin width={16} height={16} />
                        {country}
                    </span>

                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{destinationName}</h1>
                            <div className="text-gray-600 flex gap-2 items-center mt-1 text-sm">
                                <Calendar width={16} height={16} />
                                {duration} {duration === 1 ? "day" : "days"}
                            </div>
                        </div>
                        <div className="text-right whitespace-nowrap">
                            <span className="font-bold text-lg text-gray-900">${price}</span>
                            <span className="text-gray-500 text-sm">/person</span>
                        </div>
                    </div>

                    <div className="border-t pt-5">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Overview</h2>
                        <p className="text-gray-500 leading-relaxed">{description}</p>
                    </div>

                    <div className="flex gap-3 mt-4 pt-2">
                        <EditModal destination={destination} />
                        <DeleteDestination destination={destination} />
                    </div>
                </div>

                {/* Right: booking card */}
                <div className="md:col-span-1">
                    <BookingCard destination={destination} />
                </div>
            </div>
        </div>
    );
};

export default BookingDetailsPage;