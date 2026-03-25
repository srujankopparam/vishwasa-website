import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brown text-cream pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4 text-cream">Vishwasa</h3>
            <p className="text-cream/80 max-w-sm mb-4">Mother&apos;s Trust, Nature&apos;s Best. Traditional recipes made with better ingredients.</p>
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
              <li><Link href="/contact" className="hover:text-amber-100 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-orange-light">Contact</h4>
            <ul className="space-y-2 text-cream/80">
              <li>Bengaluru, India</li>
              <li>Order via WhatsApp</li>
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
