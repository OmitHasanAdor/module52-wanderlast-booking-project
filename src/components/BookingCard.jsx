import { Button } from "@heroui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { VscPass } from "react-icons/vsc";


const BookingCard = ({destination}) => {
     const { country, category, price, duration, departureDate, description, destinationName, imageUrl, _id } = destination
    return (
        <div>
            <div className=" grid grid-cols-3 gap-4 mt-10 max-w-6xl mx-auto ">
                <div className="rightside col-span-2 ">
            <p className=" text-gray-500 "><FaMapMarkerAlt />{country}</p>
            <h2 className=" text-4xl">{destinationName}</h2>
                </div>
                <div className="leftside col-span-1  p-3  rounded-sm shadow-md">
            <div className=" flex flex-col space-y-3">
                <div className="">
                <p className=" text-gray-500">Starting From</p>
                <h2 className=" text-3xl text-cyan-500">${price}</h2>
                <p className=" text-gray-500">per person</p>
                </div>
                <div className=" bg-gray-200 border border-gray-500 w-full p-2">{departureDate}</div>
                <Button className=" mt-3 w-full rounded-none bg-cyan-500 text-white" size="lg" href={`/destination`}>
                    Book Now
                </Button>
                <ul className="">
                    <li className="flex items-center gap-2 text-gray-500"><VscPass className=" text-green-500"/>Free cancellation up to 7 days</li>
                    <li className="flex items-center gap-2 text-gray-500"><VscPass className=" text-green-500"/>Travel insurance included</li>
                    <li className="flex items-center gap-2 text-gray-500"><VscPass className=" text-green-500"/>24/7 customer support</li>
                </ul>

            </div>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;