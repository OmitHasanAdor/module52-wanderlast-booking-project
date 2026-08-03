import { Calendar, MapPin } from "@gravity-ui/icons";
import Image from "next/image";
import CustomRenderFunction from "./CustomRenderFunction";

export interface Destination {
    _id: string;
    destinationName: string;
    country: string;
    category: string;
    price: number;
    duration: number;
    departureDate: string;
    description: string;
    imageUrl: string;
}

interface DestinationCardProps {
    dest: Destination;
}

const DestinationCard = ({ dest }: DestinationCardProps) => {
    const {
        _id,
        country,
        category,
        price,
        duration,
        description,
        destinationName,
        imageUrl,
    } = dest;

    return (
        <div className="rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white group">
            {/* Image */}
            <div className="relative">
                <Image
                    src={imageUrl}
                    alt={destinationName}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {category && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full text-gray-800">
                        {category}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <span className="flex items-center gap-1.5 text-gray-500 text-sm mb-2">
                    <MapPin width={16} height={16} />
                    {country}
                </span>

                <div className="flex justify-between items-start gap-3">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                            {destinationName}
                        </h3>
                        <div className="text-gray-600 flex gap-1.5 items-center text-sm mt-1">
                            <Calendar width={16} height={16} />
                            {duration} {duration === 1 ? "day" : "days"}
                        </div>
                    </div>
                    <div className="text-right whitespace-nowrap">
                        <span className="font-bold text-lg text-gray-900">${price}</span>
                        <span className="text-gray-500 text-sm">/person</span>
                    </div>
                </div>

                {description && (
                    <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                        {description}
                    </p>
                )}

                <div className="mt-4">
                  <CustomRenderFunction id={_id} />
                </div>
            </div>
        </div>
    );
};

export default DestinationCard;