import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const josefins = Josefin_Sans({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Wanderlast Booking",
    description:
        "Book your dream travel packages with Wanderlast Booking. Explore, compare, and secure unforgettable adventures worldwide. Your journey starts here!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${josefins.className} h-full antialiased`}>
            <body className="min-h-full flex flex-col">
                <Navbar />

                <main className="flex-1">{children}</main>

                <Footer />
                <Toaster
                    position="top-center"
                    toastOptions={{
                        duration: 3000,
                    }}
                />
            </body>
        </html>
    );
}