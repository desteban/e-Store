import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/Product.model';

interface getProductsProps {
  categoryId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private url: string = 'https://api.escuelajs.co/api/v1/products';

  getProducts(props: getProductsProps) {
    return this.http.get<Product[]>(this.url);
  }

  getProductsByFilters({ categoryId }: getProductsProps) {
    const url = new URL(this.url);
    if (categoryId) {
      url.searchParams.set('categoryId', categoryId);
    }

    return this.http.get<Product[]>(url.toString());
  }

  getOne(id: string) {
    return this.http.get<Product>(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
  }
}
