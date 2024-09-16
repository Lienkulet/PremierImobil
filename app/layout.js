import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Premier Imobil",
  description: "Premier Imobil",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Toaster />
        <Navbar />
        <div className="container">
          {children}
        </div>
          <Footer />
      </body>
    </html>
  );
}
