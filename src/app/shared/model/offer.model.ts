import { Category } from "./category.model";

export interface OfferShort {
  offerID: string;
  description: string;
}

export interface Offer extends OfferShort {
  slug: string;
  price: number;
  images: string[];
  tag?: string;
  metrics: OfferMetrics;
  store: OfferStore;
  lastPrice: number;
  category: Category;
  additionalInformation: string;
  status: string;
}

export interface CreateOffer {
  description: string;
  store: OfferStore;
  category: Category;
  additionalInformation: string;
  datePublish: Date;
  dateExpire: Date;
  price: number;
  lastPrice: number;
  images: string[];
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
  storeID: string;
  name: string;
}

export interface OfferResponse {
  message: string;
  result: Offer[];
  page: number;
}

export interface OfferPage {
  offers: Offer[];
  count: number;
  lastPageKey?: string;
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

export interface OfferImage {
  fileName: string;
  file: File;
}
