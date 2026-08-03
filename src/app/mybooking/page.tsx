import BookingDelete from "@/components/BookingDelete";
import { auth } from "@/lib/auth";
import { Eye, TrashBin } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";


const MyBookingsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
      const {token} =await auth.api.getToken({
        headers: await headers()
    })
    const user = session?.user;
    console.log("User in MyBookingsPage:", user);
    const id = user?.id;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}`,{
        headers:{
            authorization: `Bearer ${token}`
        }
    });
    const bookings = await res.json()
    console.log('data', bookings)

    return (
        <div className=" p-5 max-w-[85%] mx-auto">
            <h2>My Bookings</h2>
            <div className="">
                {
                    bookings.map(booking => {
                        return <div key={booking._id} className=" p-5 rounded-md shadow-md mb-5 flex items-center gap-5 justify-between">
                            <div className="  ">
                                <Image src={booking?.imageUrl} alt={booking?.destinationName} width={200} height={150} className=" rounded-md h-25 w-auto" />
                            </div>
                            <div className="">
                                <h3 className=" text-lg font-bold">{booking.destinationName}</h3>
                                <p>Booking Date: {new Date(booking.date).toLocaleDateString()}</p>
                                <p className="">Booking ID: {booking._id}</p>
                                <p className=" text-cyan-500 text-2xl font-semibold">Price: ${booking.price}</p>
                            </div>
                           
                            <div className="">
                            <BookingDelete bookingId={booking._id} />
                                <Button>
                                    <Eye/>
                                    view
                                </Button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default MyBookingsPage;