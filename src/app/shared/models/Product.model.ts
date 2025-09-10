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
