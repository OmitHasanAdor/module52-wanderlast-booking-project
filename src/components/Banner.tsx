"use client";

import { Separator } from "@heroui/react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, DollarSign, Users, Search } from "lucide-react";

const Banner = () => {
    const router = useRouter();
    const [location, setLocation] = useState("");
    const [duration, setDuration] = useState("");
    const [budget, setBudget] = useState("");
    const [people, setPeople] = useState("");

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (location) params.set("location", location);
        if (duration) params.set("duration", duration);
        if (budget) params.set("budget", budget);
        if (people) params.set("people", people);
        router.push(`/destination?${params.toString()}`);
    };

    return (
        <div
            style={{ backgroundImage: "url('/assets/Banner.png')" }}
            className="bg-cover bg-center text-white flex justify-between flex-col items-center gap-5 min-h-137.5 w-full"
        >
            <div className="p-10 text-center flex justify-center flex-col items-center gap-4 flex-1">
                <h1 className="text-4xl md:text-7xl font-bold leading-tight">
                    Discover Your <br /> Next Adventure
                </h1>

                <p className="text-lg md:text-2xl max-w-2xl text-gray-100">
                    Explore breathtaking destinations and create unforgettable memories
                    with our curated travel experiences.
                </p>

                <div className="flex gap-5 mt-2">
                    <button
                        onClick={() => router.push("/destination")}
                        className="uppercase bg-cyan-500 px-6 py-3 font-semibold cursor-pointer hover:bg-cyan-600 transition-all rounded-md"
                    >
                        Explore Now
                    </button>

                    <button
                        onClick={() => router.push("/destination")}
                        className="uppercase px-6 py-3 bg-white/30 font-semibold cursor-pointer hover:bg-white/40 transition-all backdrop-blur-sm rounded-md"
                    >
                        View Destination
                    </button>
                </div>
            </div>

            {/* Search bar */}
            <form
                onSubmit={handleSearch}
                className="bg-white/20 backdrop-blur-md flex flex-col md:flex-row justify-between gap-4 md:gap-2 w-full items-stretch md:items-center py-6 px-6 max-w-7xl mx-auto rounded-t-xl border border-white/10"
            >
                <div className="flex items-center gap-2 px-3">
                    <MapPin size={18} className="text-cyan-300 shrink-0" />
                    <div className="text-left w-full">
                        <h3 className="text-sm font-semibold">Location</h3>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Address, City or Zip"
                            className="bg-transparent outline-none text-xs text-gray-200 placeholder:text-gray-300 w-full"
                        />
                    </div>
                </div>

                <Separator orientation="vertical" className="hidden md:block h-10 bg-white/30" />

                <div className="flex items-center gap-2 px-3">
                    <Calendar size={18} className="text-cyan-300 shrink-0" />
                    <div className="text-left w-full">
                        <h3 className="text-sm font-semibold">Date/Duration</h3>
                        <input
                            type="text"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="Anytime / 3 Days"
                            className="bg-transparent outline-none text-xs text-gray-200 placeholder:text-gray-300 w-full"
                        />
                    </div>
                </div>

                <Separator orientation="vertical" className="hidden md:block h-10 bg-white/30" />

                <div className="flex items-center gap-2 px-3">
                    <DollarSign size={18} className="text-cyan-300 shrink-0" />
                    <div className="text-left w-full">
                        <h3 className="text-sm font-semibold">Budget</h3>
                        <input
                            type="text"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            placeholder="$0 - $3000"
                            className="bg-transparent outline-none text-xs text-gray-200 placeholder:text-gray-300 w-full"
                        />
                    </div>
                </div>

                <Separator orientation="vertical" className="hidden md:block h-10 bg-white/30" />

                <div className="flex items-center gap-2 px-3">
                    <Users size={18} className="text-cyan-300 shrink-0" />
                    <div className="text-left w-full">
                        <h3 className="text-sm font-semibold">People</h3>
                        <input
                            type="text"
                            value={people}
                            onChange={(e) => setPeople(e.target.value)}
                            placeholder="5 - 10"
                            className="bg-transparent outline-none text-xs text-gray-200 placeholder:text-gray-300 w-full"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-cyan-500 py-3 px-6 cursor-pointer hover:bg-cyan-600 transition-all rounded-md font-semibold shadow-lg shrink-0"
                >
                    <Search size={16} />
                    Search
                </button>
            </form>
        </div>
    );
};

export default Banner;