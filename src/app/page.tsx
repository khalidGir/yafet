import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Bedding"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            Elevate Your Sleep to <br />
            <span className="italic">Royal Standards</span>
          </h1>
          <p className="text-lg md:text-xl font-light mb-10 tracking-wide text-gray-200">
            Premium Bedding & Home Essentials. Curated for the Ethiopian Home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/catalog/royal-silk-bedding" 
              className="bg-white text-black px-10 py-4 font-bold tracking-[0.2em] uppercase hover:bg-gray-100 transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Featured Preview */}
      <section className="py-24 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-serif mb-16">The Signature Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Pure Silk", slug: "royal-silk-bedding", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600" },
            { name: "Egyptian Cotton", slug: "egyptian-cotton", img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=600" },
            { name: "Velvet Comfort", slug: "velvet-comfort", img: "https://images.unsplash.com/photo-1505693333238-bc63a560dd37?auto=format&fit=crop&q=80&w=600" },
          ].map((item) => (
            <Link key={item.slug} href={`/catalog/${item.slug}`} className="group block text-left">
              <div className="aspect-[4/5] relative overflow-hidden mb-4 bg-gray-100">
                <Image 
                  src={item.img} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-xl mb-1">{item.name}</h3>
              <p className="text-xs tracking-widest uppercase text-gray-400 group-hover:text-black transition-colors">View Details</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-white py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
              <span className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4 block">Our Promise</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-8 text-gray-800">Quality You Can Feel, Service You Can Trust</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
                  <div>
                      <h4 className="font-bold mb-2 uppercase text-xs tracking-widest">Free Delivery</h4>
                      <p className="text-gray-500 text-sm">Within Addis Ababa for orders over 5,000 ETB.</p>
                  </div>
                  <div>
                      <h4 className="font-bold mb-2 uppercase text-xs tracking-widest">Inspection on Arrival</h4>
                      <p className="text-gray-500 text-sm">Pay only after you've inspected the quality.</p>
                  </div>
                  <div>
                      <h4 className="font-bold mb-2 uppercase text-xs tracking-widest">Luxury Materials</h4>
                      <p className="text-gray-500 text-sm">Sourced from the finest global suppliers.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-100 text-center">
          <p className="text-xs tracking-widest uppercase text-gray-400">© 2026 Yafet Premium Bedding. Addis Ababa, Ethiopia.</p>
      </footer>
    </div>
  );
}
