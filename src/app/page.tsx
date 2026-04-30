import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image_url: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .limit(3)
        .order('created_at', { ascending: false });
      
      if (data) setProducts(data);
      setLoading(false);
    }
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Navigation Overlay */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-gradient-to-b from-black/20 to-transparent">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-white font-serif text-2xl tracking-[0.2em] font-bold"
        >
          YAFET
        </motion.div>
        <div className="hidden md:flex gap-10 text-white text-[10px] uppercase tracking-[0.3em] font-bold">
          <Link href="/catalog" className="hover:text-luxury-gold transition-colors">Catalog</Link>
          <Link href="/about" className="hover:text-luxury-gold transition-colors">Heritage</Link>
          <Link href="/contact" className="hover:text-luxury-gold transition-colors">Contact</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Bedding"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </motion.div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="inline-block text-xs md:text-sm tracking-[0.5em] uppercase mb-8 text-luxury-gold font-bold">
              Ethically Sourced • Global Luxury
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif mb-10 leading-[0.9] tracking-tighter">
              The Art of <br />
              <span className="italic">Fine Sleep</span>
            </h1>
            <p className="text-lg md:text-2xl font-light mb-12 tracking-wide text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Curated premium bedding for the most discerning Ethiopian homes. 
              Quality verified, delivered with care.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/catalog" 
                className="group relative bg-white text-black px-12 py-5 font-bold tracking-[0.2em] uppercase overflow-hidden transition-all hover:pr-16"
              >
                <span className="relative z-10">Discover Collection</span>
                <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300" size={20} />
              </Link>
              <Link 
                href="/catalog" 
                className="text-white border-b border-white/30 pb-2 text-xs tracking-[0.3em] uppercase hover:border-white transition-all"
              >
                View Catalog
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent mx-auto"></div>
        </motion.div>
      </section>

      {/* Editorial Grid Section */}
      <section className="py-32 px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <span className="text-luxury-gold text-xs tracking-[0.4em] uppercase font-bold mb-6 block">01 — The Standard</span>
            <h2 className="text-5xl font-serif mb-8 leading-tight">600 Thread Count <br/>Mulberry Silk</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10 font-light">
              Our signature silk collection isn't just bedding; it's a dermatological investment. 
              Natural proteins preserve skin hydration and prevent hair breakage while you rest.
            </p>
            <Link href="/catalog" className="inline-flex items-center gap-4 text-xs tracking-[0.3em] uppercase font-bold hover:text-luxury-gold transition-colors">
              Browse All <ArrowRight size={16}/>
            </Link>
          </motion.div>
          <motion.div 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: true }}
            className="lg:col-span-7 aspect-[16/10] relative overflow-hidden bg-gray-100 rounded-sm shadow-2xl"
          >
            <Image 
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200" 
              alt="Silk Detail" 
              fill 
              className="object-cover parallax-hover"
            />
          </motion.div>
        </div>

        {/* Featured Showcase */}
        <div className="text-center mb-24">
           <h2 className="text-xs tracking-[0.6em] uppercase text-gray-400 mb-4">Latest Arrivals</h2>
           <div className="w-20 h-[1px] bg-luxury-gold mx-auto"></div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gray-200" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {products.map((item, index) => (
              <motion.div
                key={item.id}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Link href={`/catalog/${item.id}`} className="group block">
                  <div className="aspect-[3/4] relative overflow-hidden mb-6 bg-gray-100">
                    <img 
                      src={item.image_url} 
                      alt={item.name} 
                      className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-2xl mb-1">{item.name}</h3>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400">{item.price}</p>
                    </div>
                    <div className="p-2 border border-gray-100 rounded-full group-hover:border-luxury-gold group-hover:text-luxury-gold transition-colors">
                      <ArrowRight size={14}/>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Testimonial Section */}
      <section className="bg-black py-32 px-8 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center text-white relative">
              <motion.div 
                whileInView={{ opacity: 0.1 }}
                initial={{ opacity: 0 }}
                className="absolute -top-10 -left-10 text-9xl font-serif italic text-white"
              >
                "
              </motion.div>
              <motion.div
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center gap-1 mb-8">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-luxury-gold text-luxury-gold"/>)}
                </div>
                <p className="text-3xl md:text-5xl font-serif italic mb-12 leading-tight">
                  "The quality of the Royal Silk set completely changed my sleep hygiene. It’s hard to imagine going back to anything else."
                </p>
                <div className="h-[1px] w-12 bg-luxury-gold mx-auto mb-6"></div>
                <span className="text-xs tracking-[0.4em] uppercase text-gray-400">Dr. Selamawit T. • Addis Ababa</span>
              </motion.div>
          </div>
      </section>

      {/* Call to Action Footer */}
      <footer className="py-32 px-8 bg-[#faf9f6]">
          <div className="max-w-[1400px] mx-auto border-t border-gray-200 pt-20 flex flex-col md:flex-row justify-between gap-20">
              <div className="max-w-sm">
                  <h2 className="text-2xl font-serif mb-6">YAFET</h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">
                      We source the world's most luxurious fabrics to bring a global standard of rest to Ethiopia. Luxury is not an option; it's a standard of living.
                  </p>
                  <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-luxury-gold hover:text-white transition-colors cursor-pointer"><ArrowRight size={18}/></div>
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-luxury-gold hover:text-white transition-colors cursor-pointer"><ArrowRight size={18}/></div>
                  </div>
              </div>
              
              <div className="grid grid-cols-2 gap-20">
                  <div>
                      <h4 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-6">Explore</h4>
                      <ul className="space-y-4 text-sm text-gray-500">
                          <li><Link href="/catalog" className="hover:text-black transition-colors">Catalog</Link></li>
                          <li><Link href="/about" className="hover:text-black transition-colors">Our Story</Link></li>
                          <li><Link href="/shipping" className="hover:text-black transition-colors">Shipping</Link></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-6">Connect</h4>
                      <ul className="space-y-4 text-sm text-gray-500">
                          <li><a href="tel:+251911223344" className="hover:text-black transition-colors">Call Support</a></li>
                          <li><a href="https://wa.me/251911223344" className="hover:text-black transition-colors">WhatsApp</a></li>
                          <li><a href="mailto:hello@yafet.com" className="hover:text-black transition-colors">Email</a></li>
                      </ul>
                  </div>
              </div>
          </div>
          <div className="text-center mt-32 text-[10px] tracking-[0.3em] uppercase text-gray-300">
              © 2026 Yafet Premium. All Rights Reserved.
          </div>
      </footer>
    </div>
  );
}
