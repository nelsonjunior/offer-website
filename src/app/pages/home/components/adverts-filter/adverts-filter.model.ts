import { Category } from "src/app/shared/model/category.model";

export interface AdvertsFilter {
  categories?: Category[];
  minPrice?: number;
  maxPrice?: number;
  rate?: number;
  orderBy?: number;
}
