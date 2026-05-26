'use client';
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";



const Navbar = () => {
    const { data, error, isPending } = authClient.useSession();
    console.log("Session Data:", data);
    const user = data?.user;
    console.log("User Data:", user);
    console.log(user?.image);


    return (
        <div className="flex items-center justify-between p-4 bg-white shadow-md">
            <ul className=" flex space-x-4 font-semibold">
                <li className=""><Link className="" href={'/'}>Home</Link></li>
                <li className=""><Link className="" href={'/destination'}>Destinations</Link></li>
                <li className=""><Link className="" href={'/mybooking'}>My Bookings</Link></li>
                <li className=""><Link className="" href={'/add-destination'}>Add Destination</Link></li>
            </ul>
            <div className="">
                <Image src={'/assets/Wanderlast.png'} alt="Logo" width={100} height={50} className=" w-auto h-auto" />
            </div>
            <div className=" flex space-x-4">
                <ul className=" flex items-center space-x-4 font-semibold">
                    <li className=""><Link className="" href={'/profile'}>Profile</Link></li>
                    {data ? <>
                        <div className="flex items-center gap-2">
                            <li className="">Hello, {user?.name}</li>
                            <li className=""><Image src={user?.image || 'https://cdn-icons-png.flaticon.com/512/3675/3675805.png'} alt="Avatar" width={30} height={30} className=" rounded-[50%] h-10 w-10" /></li>
                            <li className=" cursor-pointer btn btn-outline" onClick={() => authClient.signOut()}>Sign Out</li>
                        </div>
                    </>
                        : <>
                            <li className=""><Link className="" href={'/login'}>Login</Link></li>
                            <li className=""><Link className="" href={'/signup'}>Sign Up</Link></li>
                        </>

                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;