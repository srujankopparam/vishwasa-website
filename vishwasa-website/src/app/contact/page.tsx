import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="py-16 bg-cream/20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brown mb-4">Get in Touch</h1>
          <p className="text-lg text-brown/70">We&apos;d love to hear from you. Reach out for bulk orders or feedback.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-brown/10">
            <h2 className="font-serif text-2xl font-bold text-brown mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-brown mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-brown/20 focus:outline-none focus:ring-2 focus:ring-orange/50" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown mb-2">Phone Number</label>
                <input type="tel" className="w-full px-4 py-3 rounded-lg border border-brown/20 focus:outline-none focus:ring-2 focus:ring-orange/50" placeholder="Your phone number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-brown/20 focus:outline-none focus:ring-2 focus:ring-orange/50" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="w-full bg-orange hover:bg-orange-light text-white font-bold py-3 rounded-lg transition-colors">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brown/10 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="bg-green/10 p-4 rounded-full text-green">
                <MessageCircle size={32} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-brown mb-2">WhatsApp Us</h3>
                <p className="text-brown/70 mb-4">Fastest way to order or ask questions.</p>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-green font-bold hover:underline">
                  +91 98765 43210
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brown/10 flex items-start gap-4">
              <div className="bg-orange/10 p-4 rounded-full text-orange">
                <MapPin size={32} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-brown mb-2">Our Kitchen</h3>
                <p className="text-brown/70">
                  Vishwasa Foods<br />
                  123 Traditional Street, J.P. Nagar<br />
                  Bengaluru, Karnataka 560078
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brown/10 flex items-start gap-4">
              <div className="bg-brown/10 p-4 rounded-full text-brown">
                <Mail size={32} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-brown mb-2">Email Us</h3>
                <p className="text-brown/70">
                  hello@vishwasa.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
