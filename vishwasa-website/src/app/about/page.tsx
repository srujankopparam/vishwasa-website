import { Target, Heart, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brown mb-6">Our Story</h1>
          <p className="text-xl text-brown/80 leading-relaxed">
            Vishwasa was born out of a simple desire: to bring back the authentic taste of our grandmothers&apos; kitchens. 
            In a world filled with mass-produced snacks using cheap palm oil and artificial preservatives, we decided to take a step back to our roots.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
          <div className="text-center">
            <div className="bg-cream w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-brown">
              <Heart size={40} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brown mb-4">Made with Love</h3>
            <p className="text-brown/80">Every batch is prepared with the exact same care and ingredients we use for our own family.</p>
          </div>
          <div className="text-center">
            <div className="bg-cream w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-brown">
              <ShieldCheck size={40} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brown mb-4">No Compromise</h3>
            <p className="text-brown/80">0% Palm Oil. 0% Artificial Colors. We strictly use pure butter, desi ghee, and local cold-pressed oils.</p>
          </div>
          <div className="text-center">
            <div className="bg-cream w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-brown">
              <Target size={40} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brown mb-4">Authentic Taste</h3>
            <p className="text-brown/80">Following generations-old traditional recipes that capture the true essence of South India.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
