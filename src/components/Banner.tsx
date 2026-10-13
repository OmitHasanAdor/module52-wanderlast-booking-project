"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plane } from "lucide-react";

const BACKGROUNDS = [
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80",
  "https://images.unsplash.com/photo-1530789256252-ade271ddc56d?w=1920&q=80",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80",
];

const STATS = [
  { label: "Destinations", value: "50+" },
  { label: "Happy Travelers", value: "12k+" },
  { label: "Countries", value: "30+" },
];

const Banner = () => {
  const router = useRouter();
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BACKGROUNDS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden">
      {/* Animated backgrounds */}
      <AnimatePresence mode="wait">
        <motion.div
          key={bgIndex}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BACKGROUNDS[bgIndex]})` }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/75" />
      <div className="absolute inset-0 bg-linear-to-r from-[#4f39f6]/25 via-transparent to-[#9514fa]/20" />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -24, 0], x: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[10%] top-[20%] h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -16, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-[20%] right-[12%] h-52 w-52 rounded-full bg-purple-500/25 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur-md"
        >
          <Plane className="h-4 w-4 text-cyan-300" />
          <span>Your next journey starts here</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Discover Your{" "}
          <span className="bg-linear-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
            Next Adventure
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-5 max-w-2xl text-base text-gray-200 sm:text-lg md:text-xl"
        >
          Explore breathtaking destinations and create unforgettable memories
          with curated travel experiences worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => router.push("/destination")}
            className="rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-cyan-500/30 transition hover:scale-[1.03] hover:shadow-cyan-500/50"
          >
            Explore Now
          </button>
          <button
            onClick={() => router.push("/destination")}
            className="rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-md transition hover:bg-white/20"
          >
            View Destinations
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-14 flex flex-wrap justify-center gap-10 md:gap-16"
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-white md:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;