import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "../components/ClientLayoutWrapper";
import { CartProvider } from "../context/CartContext";
import { SettingsProvider } from "../context/SettingsContext";
import { sql } from "@vercel/postgres";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export async function generateMetadata(): Promise<Metadata> {
  const defaultTitle = 'Vishwasa Foods – Traditional South Indian Snacks';
  const defaultDescription = 'Authentic murukku, mixture, banana chips, chakli, kodubale & nippattu. Made with cold-pressed peanut oil and fresh butter. No palm oil, no preservatives. FSSAI certified.';

  let title = defaultTitle;
  let description = defaultDescription;

  try {
    const { rows } = await sql`
      SELECT key, value FROM website_settings
      WHERE key IN ('seoTitle', 'seoDescription');
    `;
    const s: Record<string, string> = (rows as any).reduce(
      (acc: Record<string, string>, row: any) => ({ ...acc, [row.key]: row.value }),
      {}
    );
    title = s["seoTitle"] || defaultTitle;
    description = s["seoDescription"] || defaultDescription;
  } catch {
    // DB unavailable – fall back to defaults
  }

  return {
    metadataBase: new URL('https://vishwasa.com'),
    title: {
      default: title,
      template: '%s | Vishwasa Foods',
    },
    description,
    keywords: ['murukku', 'South Indian snacks', 'banana chips', 'mixture', 'chakli', 'kodubale', 'nippattu', 'traditional snacks', 'Bangalore snacks', 'no preservatives', 'cold pressed oil'],
    openGraph: {
      title,
      description: "Mother's Trust, Nature's Best. Authentic snacks made the traditional way.",
      url: 'https://vishwasa.com',
      siteName: 'Vishwasa Foods',
      locale: 'en_IN',
      type: 'website',
    },
  };
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
        <Analytics />
      </body>
    </html>
  );
}
