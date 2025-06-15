export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  image?: string;
  imageUrls: string[];
}
