import BookingDelete from "@/components/BookingDelete";
import { auth } from "@/lib/auth";
import { Eye } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Booking {
    _id: string;
    destinationName: string;
    imageUrl: string;
    date: string;
    price: number;
    destinationId: string;
}

async function getBookings(userId: string, token?: string): Promise<Booking[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${userId}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) return [];

        const data = await res.json();
        return Array.isArray(data) ? data : data?.bookings ?? [];
    } catch (err) {
        console.error("Failed to fetch bookings:", err);
        return [];
    }
}

const MyBookingsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/login");
    }

    const tokenResult = await auth.api.getToken({
        headers: await headers(),
    });

    const bookings = await getBookings(session.user.id, tokenResult?.token);

    return (
        <div className="p-5 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>

            {bookings.length === 0 ? (
                <div className="text-center py-24 text-gray-500">
                    <p className="text-lg font-medium">You don&apos;t have any bookings yet</p>
                    <Link href="/destination" className="text-cyan-500 hover:underline mt-2 inline-block">
                        Explore destinations
                    </Link>
                </div>
            ) : (
                <div className="space-y-5">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="p-5 rounded-md shadow-md flex flex-col sm:flex-row items-center gap-5 justify-between bg-white"
                        >
                            <Image
                                src={booking.imageUrl}
                                alt={booking.destinationName}
                                width={200}
                                height={150}
                                className="rounded-md h-24 w-32 object-cover shrink-0"
                            />

                            <div className="flex-1 w-full">
                                <h3 className="text-lg font-bold text-gray-900">{booking.destinationName}</h3>
                                <p className="text-sm text-gray-500">
                                    Booking Date: {new Date(booking.date).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500">Booking ID: {booking._id}</p>
                                <p className="text-cyan-500 text-2xl font-semibold mt-1">
                                    ${booking.price}
                                </p>
                            </div>

                            <div className="flex gap-2 shrink-0">
                                <Link href={`/destination/${booking.destinationId}`}>
                                    <Button variant="outline" className="rounded-md flex items-center gap-1">
                                        <Eye />
                                        View
                                    </Button>
                                </Link>
                                <BookingDelete bookingId={booking._id} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookingsPage;