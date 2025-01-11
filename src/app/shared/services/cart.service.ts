import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Product[]>([]);
  sizeCart = computed(() => this.cart().length ?? 10);
  totalPriceCart = computed(() =>
    this.cart().reduce((total, product) => total + product.price, 0)
  );

  addToCart(productToCart: Product) {
    this.cart.update((prev) => [...prev, productToCart]);
  }

  deleteToCart(index: number) {
    this.cart.update((prev) => prev.filter((_, i) => i !== index));
  }
}
