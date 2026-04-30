import React from 'react';
import Image from 'next/image';
import CallToOrderFAB from '@/components/CallToOrderFAB';
import { CheckCircle, ShieldCheck, Truck } from 'lucide-react';

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  // This would normally come from a database
  const product = {
    name: "Royal Silk Bedding Set",
    description: "Experience the ultimate luxury with our Royal Silk Bedding Set. Crafted from the finest mulberry silk, this set offers unparalleled comfort and a sophisticated aesthetic for your bedroom.",
    fabric: "100% Mulberry Silk",
    threadCount: 600,
    price: "4,500 ETB",
    features: [
      "Hypoallergenic & Breathable",
      "Temperature Regulating",
      "Machine Washable (Gentle Cycle)",
      "Includes 1 Flat Sheet, 1 Fitted Sheet, and 4 Pillowcases"
    ],
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1000"
    ]
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900">
      <main className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Image Gallery Mockup */}
          <div className="space-y-4">
            <div className="aspect-[4/5] relative overflow-hidden bg-gray-200 rounded-sm">
              <Image 
                src={product.images[0]} 
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square relative bg-gray-200 rounded-sm overflow-hidden">
                <Image src={product.images[1]} alt="Detail" fill className="object-cover" />
              </div>
              <div className="aspect-square relative bg-gray-100 rounded-sm flex items-center justify-center border border-dashed border-gray-300">
                <p className="text-gray-400 text-sm">More images</p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <nav className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-6">
              Bedding / Luxury Collection
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-serif mb-4 text-gray-800">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="text-2xl font-light text-gray-900">{product.price}</span>
              <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] tracking-widest uppercase font-bold border border-amber-200 rounded-full">
                Negotiable
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg font-light">
              {product.description}
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-gray-400"><CheckCircle size={20} /></div>
                <div>
                  <h3 className="font-medium text-sm">Premium Material</h3>
                  <p className="text-gray-500 text-sm">{product.fabric} - {product.threadCount} Thread Count</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 text-gray-400"><Truck size={20} /></div>
                <div>
                  <h3 className="font-medium text-sm">Doorstep Delivery</h3>
                  <p className="text-gray-500 text-sm">Available across Addis Ababa and regional cities.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 text-gray-400"><ShieldCheck size={20} /></div>
                <div>
                  <h3 className="font-medium text-sm">Quality Guaranteed</h3>
                  <p className="text-gray-500 text-sm">Inspect before you pay. 100% satisfaction or return.</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex flex-col gap-4">
                <a 
                    href="tel:+251911223344"
                    className="w-full bg-black text-white py-5 text-center font-bold tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors"
                >
                    Call to Negotiate & Order
                </a>
                <p className="text-center text-xs text-gray-400 italic">
                    Final price depends on delivery location and quantity.
                </p>
            </div>
          </div>
        </div>

        {/* Extended Details section */}
        <div className="mt-24 pt-24 border-t border-gray-100">
            <h2 className="text-2xl font-serif mb-12 text-center">Specifications & Care</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h3 className="text-xs uppercase tracking-widest font-bold mb-4">Set Includes</h3>
                    <ul className="text-gray-500 text-sm space-y-2">
                        {product.features.map((f, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xs uppercase tracking-widest font-bold mb-4">Fabric Details</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Pure mulberry silk is known for its smooth texture and durability. It contains natural proteins and essential amino acids that help keep your skin hydrated and hair smooth.
                    </p>
                </div>
                <div>
                    <h3 className="text-xs uppercase tracking-widest font-bold mb-4">Wash Care</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Hand wash or machine wash on delicate cycle with cold water. Use pH-neutral liquid detergent. Do not bleach. Air dry in shade.
                    </p>
                </div>
            </div>
        </div>
      </main>

      <CallToOrderFAB />
    </div>
  );
};

export default ProductPage;
