import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../../shared/models/Product.model';
import FiltersProducts from '../models/FiltersProducts';
import { Pagination } from '@app/shared/models/Pagination';

interface getProductsProps extends FiltersProducts, Pagination {}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private url: string = 'https://api.escuelajs.co/api/v1/products';

  getProducts(props: FiltersProducts) {
    return this.http.get<Product[]>(this.url);
  }

  getProductsByFilters({
    categoryId,
    title,
    price_max,
    price_min,
    limit,
    offset = 0,
  }: getProductsProps) {
    const url = new URL(this.url);
    if (categoryId) {
      url.searchParams.set('categoryId', categoryId);
    }

    if (title) {
      url.searchParams.set('title', title);
    }

    if (price_max && price_min) {
      url.searchParams.set('price_min', price_min.toString());
      url.searchParams.set('price_max', price_max.toString());
    }

    if (price_max && !price_min) {
      url.searchParams.set('price', price_max.toString());
    }

    if (limit) {
      url.searchParams.set('limit', limit.toString());
    }

    url.searchParams.set('offset', offset.toString());

    return this.http.get<Product[]>(url.toString());
  }

  getOne(id: string) {
    return this.http.get<Product>(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
  }
}
