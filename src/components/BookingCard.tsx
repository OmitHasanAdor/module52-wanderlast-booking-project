"use client";

import { authClient } from "@/lib/auth-client";
import { DateField, Label, Button } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { VscPass } from "react-icons/vsc";
import type { DateValue } from "@internationalized/date";
import type { Destination } from "./DestinationCard";

interface BookingCardProps {
    destination: Destination;
}

const BookingCard = ({ destination }: BookingCardProps) => {
    const [date, setDate] = useState<DateValue | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data, isPending } = authClient.useSession();
    const router = useRouter();
    const user = data?.user;

    const { country, category, price, destinationName, imageUrl, _id } = destination;

    const handleBooking = async () => {
        if (!user) {
            toast.error("Please log in to book this trip.");
            router.push("/login");
            return;
        }

        if (!date) {
            toast.error("Please select a departure date.");
            return;
        }

        setIsSubmitting(true);
        try {
            const { data: tokenData } = await authClient.token();

            const bookingData = {
                userId: user.id,
                userImage: user.image,
                userName: user.name,
                destinationId: _id,
                destinationName,
                price,
                country,
                category,
                departureDate: date.toString(),
                imageUrl,
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${tokenData?.token}`,
                },
                body: JSON.stringify(bookingData),
            });

            const result = await res.json();

            if (result.acknowledged) {
                toast.success("Booking successful!");
                setDate(null);
            } else {
                toast.error("Booking failed. Please try again.");
            }
        } catch (err) {
            console.error("Booking error:", err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="col-span-1 p-5 rounded-xl shadow-md bg-white sticky top-24">
            <div className="flex flex-col space-y-4">
                <div>
                    <p className="text-gray-500 text-sm">Starting From</p>
                    <h2 className="text-3xl font-bold text-cyan-500">${price}</h2>
                    <p className="text-gray-500 text-sm">per person</p>
                </div>

                <DateField
                    name="date"
                    value={date}
                    onChange={setDate}
                    minValue={undefined}
                    aria-label="Departure date"
                >
                    <Label className="text-sm font-medium text-gray-700">Date</Label>
                    <DateField.Group className="mt-1 border rounded-md px-3 py-2">
                        <DateField.Input>
                            {(segment) => <DateField.Segment segment={segment} />}
                        </DateField.Input>
                    </DateField.Group>
                </DateField>

                <Button
                    onClick={handleBooking}
                    isDisabled={isSubmitting || isPending}
                    className="mt-2 w-full rounded-md bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    size="lg"
                >
                    {isSubmitting ? "Booking..." : "Book Now"}
                </Button>

                <ul className="space-y-2 pt-2 border-t border-gray-100">
                    <li className="flex items-center gap-2 text-gray-500 text-sm">
                        <VscPass className="text-green-500 shrink-0" />
                        Free cancellation up to 7 days
                    </li>
                    <li className="flex items-center gap-2 text-gray-500 text-sm">
                        <VscPass className="text-green-500 shrink-0" />
                        Travel insurance included
                    </li>
                    <li className="flex items-center gap-2 text-gray-500 text-sm">
                        <VscPass className="text-green-500 shrink-0" />
                        24/7 customer support
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default BookingCard;