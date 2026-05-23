import Image from "next/image";
import Link from "next/link";



const Navbar = () => {
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
                   <ul className=" flex space-x-4 font-semibold">
                <li className=""><Link className="" href={'/profile'}>Profile</Link></li>
                <li className=""><Link className="" href={'/login'}>Login</Link></li>
                <li className=""><Link className="" href={'/signup'}>Sign Up</Link></li>
            </ul>
            </div>
        </div>
    );
};

export default Navbar;