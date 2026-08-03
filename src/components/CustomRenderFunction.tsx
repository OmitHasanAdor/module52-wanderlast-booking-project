"use client";

import { Link } from "@heroui/react";
import { ArrowRight } from "lucide-react";

interface CustomRenderFunctionProps {
    id: string;
}

const CustomRenderFunction = ({ id }: CustomRenderFunctionProps) => {
    return (
        <Link
            href={`/destination/${id}`}
            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors group"
        >
            Book Now
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
    );
};

export default CustomRenderFunction;