import { Category } from "./category.model";

export interface Offer {
  id: number;
  description: string;
  price: number;
  image: string;
  tag?: string;
  metrics: OfferMetrics;
  store: OfferStore;
}

export interface OfferShort {
  id: number;
  description: string;
}

export interface OfferMetrics {
  views: number;
  likes: number;
  comments: number;
}

export interface OfferStore {
  id: number;
  name: string;
}

export interface OfferResponse {
  message: string;
  result: Offer[];
  page: number;
}

export interface OfferShortResponse {
  message: string;
  result: OfferShort[];
}

export interface OfferFilter {
  categories?: Category[];
  minPrice?: number;
  maxPrice?: number;
  rate?: number;
  orderBy?: number;
  term?: string;
}
