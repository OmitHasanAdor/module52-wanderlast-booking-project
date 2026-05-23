import { Calendar, MapPin } from "@gravity-ui/icons";
import Image from "next/image";
import CustomRenderFunction from "./CustomRenderFunction";


const DestinationCard = ({ dest }) => {
    const {  country, category, price, duration, departureDate, description,destinationName,imageUrl ,_id} = dest
    return (
        <div className=" rounded-2xl shadow-2xl">
            <div className="">
                <Image src={imageUrl} alt={destinationName} width={600} height={400} className=" w-full h-50 rounded-2xl" />
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
            <CustomRenderFunction id={_id} dest={dest}></CustomRenderFunction>
     </div>
        </div>
    );
};

export default DestinationCard;