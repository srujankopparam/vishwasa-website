import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "../components/ClientLayoutWrapper";
import { CartProvider } from "../context/CartContext";
import { SettingsProvider } from "../context/SettingsContext";
import { sql } from "@vercel/postgres";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { rows } = await sql`
      SELECT key, value FROM website_settings
      WHERE key IN ('seoTitle', 'seoDescription');
    `;
    const s: Record<string, string> = (rows as any).reduce(
      (acc: Record<string, string>, row: any) => ({ ...acc, [row.key]: row.value }),
      {}
    );
    return {
      title: s["seoTitle"] || "Vishwasa - Traditional South Indian Snacks",
      description:
        s["seoDescription"] ||
        "Mother's Trust, Nature's Best. Traditional recipes made with better ingredients, no palm oil, and cold-pressed oils.",
    };
  } catch {
    return {
      title: "Vishwasa - Traditional South Indian Snacks",
      description: "Mother's Trust, Nature's Best.",
    };
  }
}

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
            <ClientLayoutWrapper>
              {children}
            </ClientLayoutWrapper>
          </CartProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
