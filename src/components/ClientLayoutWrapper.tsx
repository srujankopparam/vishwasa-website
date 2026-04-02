"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartFAB from "./CartFAB";
import CartSidebar from "./CartSidebar";
import WhatsAppFAB from "./WhatsAppFAB";
import AnnouncementBanner from "./AnnouncementBanner";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <AnnouncementBanner />}
      {!isAdmin && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAdmin && (
        <>
          <Footer />
          <CartFAB />
          <CartSidebar />
          <WhatsAppFAB />
        </>
      )}
    </>
  );
}
