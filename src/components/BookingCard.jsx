"use client";
import { authClient } from "@/lib/auth-client";
import { DateField, Label } from "@heroui/react";
import { Button } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaMapMarkerAlt } from "react-icons/fa";
import { VscPass } from "react-icons/vsc";


const BookingCard = ({ destination }) => {
    const [date, setDate] = useState(null);
    const { data, error, isPending } = authClient.useSession();
    const user = data?.user;
    // console.log("Session Data:", user);
    const { country, category, price, duration, departureDate, description, destinationName, imageUrl, _id } = destination


    const handleBooking = async () => {
        const bookingData = {
            userId: user?.id,
            userImage: user?.image,
            userName: user?.name,
            destinationId: _id,
            destinationName,
            price,
            date,
            country,
            category,
            departureDate: new Date(date),
            imageUrl
        };

        // token in client component
const {data:tokenData}= await authClient.token()

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${tokenData?.token}`
            
            },
            body: JSON.stringify(bookingData)
        });
        const result = await res.json();
        console.log("Booking Result:", result);
        if(result.acknowledged){
            toast.success("Booking successful!")
        } else {
            toast.error("Booking failed. Please try again.")
        }

    }
        return (
            <div>
                <div className="leftside col-span-1  p-3  rounded-sm shadow-md">
                    <div className=" flex flex-col space-y-3">
                        <div className="">
                            <p className=" text-gray-500">Starting From</p>
                            <h2 className=" text-3xl text-cyan-500">${price}</h2>
                            <p className=" text-gray-500">per person</p>
                        </div>
                        <DateField className="" name="date" onChange={setDate}>
                            <Label>Date</Label>
                            <DateField.Group>
                                <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                            </DateField.Group>
                        </DateField>
                        <Button onClick={handleBooking} className=" mt-3 w-full rounded-none bg-cyan-500 text-white" size="lg" href={`/destination`}>
                            Book Now
                        </Button>
                        <ul className="">
                            <li className="flex items-center gap-2 text-gray-500"><VscPass className=" text-green-500" />Free cancellation up to 7 days</li>
                            <li className="flex items-center gap-2 text-gray-500"><VscPass className=" text-green-500" />Travel insurance included</li>
                            <li className="flex items-center gap-2 text-gray-500"><VscPass className=" text-green-500" />24/7 customer support</li>
                        </ul>

                    </div>
                </div>
            </div>
        );
    };

    export default BookingCard;