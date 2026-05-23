import { Josefin_Sans} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const josefins = Josefin_Sans({
 
  subsets: ["latin"],
});


export const metadata = {
  title: "Wanderlast Booking",
  description: "Book your dream travel packages with Wanderlast Booking. Explore, compare, and secure unforgettable adventures worldwide. Your journey starts here!",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={` ${josefins.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
     
        <main>
          {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
