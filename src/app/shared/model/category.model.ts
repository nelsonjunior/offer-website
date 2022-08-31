export interface Category {
  id: number;
  name: string;
}

export interface CategoryResponse {
  message: string;
  result: Category[];
}
