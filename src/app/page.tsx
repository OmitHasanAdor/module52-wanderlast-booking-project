import Banner from "@/components/Banner";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wanderlast | Discover Your Next Adventure",
  description:
    "Explore breathtaking destinations and book curated travel experiences worldwide with Wanderlast.",
  keywords: [
    "travel",
    "booking",
    "destinations",
    "vacation",
    "Wanderlast",
    "tour packages",
  ],
  openGraph: {
    title: "Wanderlast | Discover Your Next Adventure",
    description:
      "Explore breathtaking destinations and book curated travel experiences worldwide.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedDestinations />
    </div>
  );
}