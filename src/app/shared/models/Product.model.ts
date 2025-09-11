import { Category } from './Category';

export interface Product {
  id: number;
  slug: string;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export interface CreateProductDTO
  extends Omit<Product, 'id' | 'slug' | 'category'> {
  categoryId: number;
}

export interface updateProductDTO
  extends Partial<Omit<Product, 'id' | 'slug' | 'category'>> {
  categoryId?: number;
}
