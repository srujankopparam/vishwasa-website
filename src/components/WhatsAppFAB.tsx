import { MessageCircle } from 'lucide-react';

export default function WhatsAppFAB() {
  const whatsappNumber = "919876543210"; // Placeholder
  const message = encodeURIComponent("Hi Vishwasa, I would like to know more about your products.");

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green hover:bg-green-dark text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 z-50 flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
