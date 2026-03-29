"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useSettings } from "../context/SettingsContext";

export default function Navbar() {
  const settings = useSettings();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled 
          ? "glass h-16 shadow-md" 
          : "bg-transparent h-20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image 
              src="/logo.png" 
              alt="Vishwasa Logo" 
              width={scrolled ? 32 : 40} 
              height={scrolled ? 32 : 40} 
              className="object-contain transition-all duration-300" 
            />
            <span className={`font-serif font-bold text-brown tracking-tight transition-all duration-300 ${
              scrolled ? "text-xl" : "text-2xl"
            }`}>
              {settings.brandName}
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "Products", "About", "FAQ", "Contact"].map((item) => (
              <Link 
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                className={`text-brown hover:text-orange-gold transition-colors font-semibold relative group ${
                  scrolled ? "text-sm" : "text-base"
                }`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button 
              className="text-brown p-2 hover:bg-brown/5 rounded-full transition-colors" 
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 glass shadow-2xl transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-[300px] border-t border-brown/10" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-8 space-y-6">
          {["Home", "Products", "About", "FAQ", "Contact"].map((item) => (
            <Link 
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
              onClick={() => setMobileOpen(false)} 
              className="text-brown font-bold text-lg hover:text-orange-gold transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
