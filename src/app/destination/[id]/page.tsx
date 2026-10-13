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

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const role = (session?.user as any)?.role || "tourist";
  const isAdmin = role === "admin";

  const tokenResult = await auth.api.getToken({
    headers: await headers(),
  });
  const token = tokenResult?.token;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    notFound();
  }

  const destination: Destination = await res.json();
  const { country, price, duration, description, destinationName, imageUrl } =
    destination;

  return (
    <div className="mx-auto my-10 max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={destinationName}
          width={1000}
          height={500}
          priority
          className="h-80 w-full object-cover md:h-96"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-3 md:p-10">
        {/* Left: details */}
        <div className="space-y-5 md:col-span-2">
          <span className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin width={16} height={16} />
            {country}
          </span>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {destinationName}
              </h1>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                <Calendar width={16} height={16} />
                {duration} {duration === 1 ? "day" : "days"}
              </div>
            </div>
            <div className="whitespace-nowrap text-right">
              <span className="text-lg font-bold text-gray-900">${price}</span>
              <span className="text-sm text-gray-500">/person</span>
            </div>
          </div>

          <div className="border-t pt-5">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Overview
            </h2>
            <p className="leading-relaxed text-gray-500">{description}</p>
          </div>

          {/* Edit + Delete → শুধু admin */}
          {isAdmin && (
            <div className="mt-4 flex gap-3 pt-2">
              <EditModal destination={destination} />
              <DeleteDestination destination={destination} />
            </div>
          )}
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