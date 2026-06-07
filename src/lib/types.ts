export interface Variant {
  color: string;
  price: string;
  image_urls: string[];
}

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image_urls: string[];
  category: string;
  created_at: string;
  variants: Variant[];
}
