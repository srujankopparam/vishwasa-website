"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { useSettings } from "../context/SettingsContext";

export default function Footer() {
  const settings = useSettings();
  return (
    <footer className="bg-brown text-cream pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white rounded p-1 flex items-center justify-center">
                <Image src="/logo.png" alt="Vishwasa Logo" width={32} height={32} className="object-contain" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-cream">{settings.brandName}</h3>
            </div>
            <p className="text-cream/80 max-w-sm mb-4">{settings.footerAbout}</p>
            <div className="flex items-center gap-2 text-sm text-cream/90 bg-cream/10 p-2 rounded inline-block">
              <ShieldCheck size={16} />
              <span>FSSAI Certified</span>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-orange-light">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="hover:text-amber-100 transition-colors">Our Products</Link></li>
              <li><Link href="/about" className="hover:text-amber-100 transition-colors">Our Story</Link></li>
              <li><Link href="/faq" className="hover:text-amber-100 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-amber-100 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-orange-light">Contact</h4>
            <ul className="space-y-2 text-cream/80">
              <li className="whitespace-pre-wrap">{settings.contactAddress}</li>
              <li>{settings.contactEmail}</li>
              <li>
                <a
                  href={`https://instagram.com/${settings.instagramHandle.replace('@','')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-light hover:text-cream transition-colors"
                >
                  {settings.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/20 pt-8 text-center text-sm text-cream/60">
          <p>&copy; {new Date().getFullYear()} Vishwasa Foods. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
