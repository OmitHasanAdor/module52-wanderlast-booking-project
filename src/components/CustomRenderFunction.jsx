"use client";
import { Link } from "@heroui/react";

const CustomRenderFunction = ({ id }) => {
    return (
        <Link href={`/destination/${id}`} className=" text-blue-500 hover:text-blue-700">
            Book Now
            <Link.Icon />
        </Link>
    );
};

export default CustomRenderFunction;