import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartFAB from "@/components/CartFAB";
import CartSidebar from "@/components/CartSidebar";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Vishwasa - Traditional South Indian Snacks",
  description: "Mother's Trust, Nature's Best. Traditional recipes made with better ingredients, no palm oil, and cold-pressed oils.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen flex flex-col relative`}>
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CartFAB />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
