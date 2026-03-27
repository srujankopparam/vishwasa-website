import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartFAB from "../components/CartFAB";
import CartSidebar from "../components/CartSidebar";
import WhatsAppFAB from "../components/WhatsAppFAB";
import { CartProvider } from "../context/CartContext";
import { SettingsProvider } from "../context/SettingsContext";
import { sql } from "@vercel/postgres";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Vishwasa - Traditional South Indian Snacks",
  description:
    "Mother's Trust, Nature's Best. Traditional recipes made with better ingredients, no palm oil, and cold-pressed oils.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialSettings = {};
  try {
    const { rows } = await sql`SELECT key, value FROM website_settings;`;
    initialSettings = rows.reduce(
      (acc: Record<string, string>, row) => ({ ...acc, [row.key]: row.value }),
      {}
    );
  } catch (error) {
    console.error(
      "Failed to fetch settings from DB, falling back to defaults.",
      error
    );
  }

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen flex flex-col relative`}
      >
        <SettingsProvider initialSettings={initialSettings}>
          <CartProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <CartFAB />
            <CartSidebar />
            <WhatsAppFAB />
          </CartProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
