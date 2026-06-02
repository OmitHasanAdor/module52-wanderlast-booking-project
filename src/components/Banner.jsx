import { Separator } from "@heroui/react";

const Banner = () => {
  return (
    <div 
      // ইনলাইন স্টাইল দিয়ে ব্যাকগ্রাউন্ড ইমেজ দিলে Vercel প্রোডাকশনে কখনো ইমেজ মিস হবে না
      style={{ backgroundImage: "url('/assets/Banner.png')" }}
      // h-150 এর বদলে ফিক্সড হাইট হিসেবে h-[550px] বা h-[600px] ব্যবহার করা হলো
      className="bg-cover bg-center text-white flex justify-between flex-col items-center gap-5 h-137 w-full"
    >
      <div className="p-10 text-center flex justify-center flex-col items-center gap-4 flex-1">
        <h1 className="text-4xl md:text-7xl font-bold leading-tight">
          Discover Your <br /> Next Adventure
        </h1>

        <p className="text-lg md:text-2xl max-w-2xl">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="flex gap-5 mt-2">
          <button className="uppercase bg-cyan-500 px-6 py-3 font-semibold cursor-pointer hover:bg-cyan-600 transition-all">
            Explore Now
          </button>

          <button className="uppercase px-6 py-3 bg-white/30 font-semibold cursor-pointer hover:bg-white/40 transition-all backdrop-blur-sm">
            View Destination
          </button>
        </div>
      </div>

      {/* নিচের সার্চ বারটিকে একটু প্যাডিং এবং সুন্দর করার জন্য রেসপনসিভ টাচ দেওয়া হলো */}
      <div className="bg-white/20 backdrop-blur-md flex justify-between gap-2 md:gap-5 w-full items-center py-4 px-6 max-w-7xl mx-auto rounded-t-xl border border-white/10">
        <div className="px-3">
          <h3 className="text-sm font-semibold">Location</h3>
          <p className="text-xs text-gray-200">Address, City or Zip</p>
        </div>

        <Separator variant="tertiary" orientation="vertical" className="h-8 bg-white/30" />

        <div>
          <h3 className="text-sm font-semibold">Date/Duration</h3>
          <p className="text-xs text-gray-200">Anytime/3 Days</p>
        </div>

        <Separator variant="tertiary" orientation="vertical" className="h-8 bg-white/30" />

        <div>
          <h3 className="text-sm font-semibold">Budget</h3>
          <p className="text-xs text-gray-200">$0-$3000</p>
        </div>

        <Separator variant="tertiary" orientation="vertical" className="h-8 bg-white/30" />

        <div>
          <h3 className="text-sm font-semibold">People</h3>
          <p className="text-xs text-gray-200">5-10</p>
        </div>

        <div className="bg-cyan-500 py-3 px-6 cursor-pointer hover:bg-cyan-600 transition-all rounded-md font-semibold shadow-lg">
          <h3>Search</h3>
        </div>
      </div>
    </div>
  );
};

export default Banner;