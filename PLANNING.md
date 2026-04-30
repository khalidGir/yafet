# Project Planning: Premium Bedding Catalog

## Site Map
1. **Home Page (`/`)**: 
   - Luxury Hero Section (High-res bedding visuals).
   - Featured Collections (Silk, Egyptian Cotton).
   - Value Proposition (Quality, Ethiopian delivery).
2. **Catalog Page (`/catalog`)**: 
   - Grid view of products.
   - Filters: Size (King, Queen, etc.), Material, Category.
3. **Product Detail Page (`/catalog/[slug]`)**: 
   - Image Gallery (with Zoom).
   - Detailed Specs (Thread count, Fabric type).
   - **Conversion Focus**: "Negotiable Price" tag + Sticky "Call to Order" FAB.
4. **Contact/Inquiry Page (`/contact`)**: 
   - Direct phone link.
   - WhatsApp link.

## Data Schema (Product)
```typescript
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  fabric: string; // e.g., Silk, Cotton
  threadCount?: number;
  size: 'Single' | 'Double' | 'Queen' | 'King' | 'Super King';
  priceRange: {
    min: number;
    max?: number;
    currency: 'ETB';
    isNegotiable: boolean;
  };
  images: string[]; // Cloudinary/Supabase URLs
  category: string;
  inStock: boolean;
  careInstructions: string[];
}
```

## Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS.
- **Database**: Supabase (PostgreSQL) or Sanity.io.
- **Deployment**: Vercel.
- **Styling**: Luxury Minimalist (Lots of white space, Serif headings, Sans-serif body).
