import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-cream border-b border-brown/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="font-serif text-3xl font-bold text-brown tracking-tight">
            Vishwasa
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-brown hover:text-orange transition-colors font-medium">Home</Link>
            <Link href="/products" className="text-brown hover:text-orange transition-colors font-medium">Products</Link>
            <Link href="/about" className="text-brown hover:text-orange transition-colors font-medium">About</Link>
            <Link href="/contact" className="text-brown hover:text-orange transition-colors font-medium">Contact</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-brown p-2">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
