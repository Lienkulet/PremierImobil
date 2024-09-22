import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Provider from "@/components/SessionProvider";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

// Server-side metadata
export const metadata = {
  title: "Premier Imobil",
  description: "Premier Imobil",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Toaster />
          <Navbar />
          <Suspense>
            <div className="container">{children}</div>
          </Suspense>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
