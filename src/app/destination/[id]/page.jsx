
import DeleteDestination from "@/components/DeleteDestination";
import EditModal from "@/components/EditModal";
import { Calendar, MapPin } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";


const BookingDetailsPage = async ({ params }) => {

    const { id } = await params;
    const res = await fetch(`http://localhost:5000/destination/${id}`);
    const destination = await res.json()
    const { country, category, price, duration, departureDate, description, destinationName, imageUrl, _id } = destination

    return (
        <div className=" rounded-2xl shadow-2xl max-w-3xl mx-auto mt-10">

            <div className="">
                <Image src={imageUrl} alt={destinationName} width={600} height={400} className=" w-full h-100 rounded-2xl" />
            </div>
            <div className=" p-5">
                <span className="flex items-center gap-2 text-gray-800">
                    <MapPin />
                    {country}
                </span>
                <div className=" flex justify-between">
                    <div className="">
                        <div className=" text-lg font-bold">{destinationName}</div>
                        <div className=" text-gray-600 flex gap-2 items-center"><Calendar></Calendar>{duration} day</div>
                    </div>
                    <div className="">
                        <span className=" font-bold text-lg">${price}</span><span className="">/person</span>
                    </div>
                </div>
                <h2 className=" text-2xl font-semibold">Overview</h2>
                <p className=" text-gray-500">{description}</p>
                <div className=" flex gap-3 mt-4">
                    <EditModal destination={destination}></EditModal>
                    <DeleteDestination destination={destination}></DeleteDestination>
                </div>
            </div>
        </div>
    );
};

export default BookingDetailsPage;