export type Language = 'en' | 'ar';

export interface FragranceNotes {
  topEn: string;
  topAr: string;
  heartEn: string;
  heartAr: string;
  baseEn: string;
  baseAr: string;
}

export interface FragranceProfile {
  sweetness: number;
  freshness: number;
  warmth: number;
  floral: number;
  woody: number;
}

export interface Product {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  category: 'feminine' | 'masculine';
  taglineEn: string;
  taglineAr: string;
  familyEn: string;
  familyAr: string;
  price: number;
  originalPrice: number;
  volume: string;
  image: string;
  bottleImage: string;
  accentColor: string;
  storyEn: string;
  storyAr: string;
  inspirationEn: string;
  inspirationAr: string;
  notes: FragranceNotes;
  profile: FragranceProfile;
  lifestyleQuoteEn: string;
  lifestyleQuoteAr: string;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingZone {
  id: string;
  nameEn: string;
  nameAr: string;
  fee: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  governorate: string;
  city: string;
  address: string;
  notes?: string;
  paymentMethod: 'cod' | 'card';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  commentEn: string;
  commentAr: string;
  productName: string;
  verifiedBuyer: boolean;
}
