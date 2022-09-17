export interface Category {
  categoryID: string;
  name: string;
}

export interface CategoryResponse {
  message: string;
  result: Category[];
}
