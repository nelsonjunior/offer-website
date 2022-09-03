import { Category } from "./category.model";

export interface OfferShort {
  id: number;
  description: string;
}

export interface Offer extends OfferShort {
  slug: string;
  price: number;
  image: string;
  tag?: string;
  metrics: OfferMetrics;
  store: OfferStore;
}

export interface CreateOffer {
  description: string;
  category: Category;
  additionalInformation: string;
  datePublish: Date;
  dateExpire: Date;
  price: number;
  lastPrice: number;
  storeID: string;
  photos: File[];
}

export interface OfferDetail extends Offer {
  lastPrice: number;
  category: Category;
  additionalInformation: string;
  location: OfferLocation;
}

export interface OfferLocation {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

export interface OfferMetrics {
  views: number;
  likes: number;
  comments: number;
}

export interface OfferStore {
  id: string;
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
