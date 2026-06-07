import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env vars');
  console.error('Run with: node --env-file=.env seed.mjs');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
  {
    name: 'Royal Mulberry Silk Set',
    description: '100% pure 22-momme Mulberry silk for the ultimate sleep experience. Hypoallergenic and temperature regulating.',
    price: '12,500 ETB',
    category: 'Pure Silk',
    image_urls: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200'],
  },
  {
    name: 'Egyptian Cotton Classic',
    description: 'Long-staple 800 thread count Egyptian cotton. Breathable, durable, and gets softer with every wash.',
    price: '8,200 ETB',
    category: 'Egyptian Cotton',
    image_urls: ['https://images.unsplash.com/photo-1629949009765-40f34d3f4138?auto=format&fit=crop&q=80&w=1200'],
  },
  {
    name: 'Midnight Velvet Duvet',
    description: 'Lush velvet texture with a soft microfiber reverse. Adds a layer of warmth and sophisticated style to any bedroom.',
    price: '9,800 ETB',
    category: 'Velvet',
    image_urls: ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200'],
  },
  {
    name: 'Golden Ochre Linen Set',
    description: 'European flax linen for a relaxed, breathable feel. Perfect for warm Addis Ababa nights.',
    price: '7,500 ETB',
    category: 'Luxury Collection',
    image_urls: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800'],
  },
  {
    name: 'Silver Mist Silk Collection',
    description: 'A cooler-toned mulberry silk set designed to preserve hair and skin health while looking stunning.',
    price: '11,000 ETB',
    category: 'Pure Silk',
    image_urls: ['https://images.unsplash.com/photo-1629949009765-40f34d3f4138?auto=format&fit=crop&q=80&w=1000'],
  },
  {
    name: 'Cloud White Hotel Series',
    description: 'Our standard hotel-grade cotton set. Crisp, clean, and reliable quality for daily use.',
    price: '5,500 ETB',
    category: 'Egyptian Cotton',
    image_urls: ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1000'],
  },
];

async function seed() {
  console.log('Starting seed...');
  const { data, error } = await supabase
    .from('products')
    .insert(products)
    .select();

  if (error) {
    console.error('Error seeding data:', error);
  } else {
    console.log('Successfully seeded products:', data.length);
  }
}

seed();
