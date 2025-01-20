import { computed, Injectable, signal } from '@angular/core';
import getProductsProps from '@app/shared/models/getProductsProps';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  categoryId = signal<string>('');
  title = signal<string>('');
  filters = computed<getProductsProps>(() => this.getFilters());
  minPrice = signal<number | undefined>(undefined);
  maxPrice = signal<number | undefined>(undefined);
  limit = signal<number>(20);
  offset = signal<number>(0);

  private getFilters(): getProductsProps {
    const filters: getProductsProps = {};

    if (this.title().length !== 0) {
      filters.title = this.title();
    }

    if (this.categoryId().length !== 0) {
      filters.categoryId = this.categoryId();
    }

    if (this.minPrice() !== null) {
      filters.price_min = this.minPrice();
    }

    if (this.maxPrice() !== null) {
      filters.price_max = this.maxPrice();
    }

    filters.limit = this.limit();
    filters.offset = this.offset();

    return filters;
  }

  changeTitle(event: Event) {
    event.preventDefault();
    const { value } = event.currentTarget as HTMLInputElement;
    this.title.set(value);
  }

  changeMaxPrice(price: number | undefined) {
    this.maxPrice.set(price);
  }

  changeMinPrice(price: number | undefined) {
    this.minPrice.set(price);
  }

  syncFilters(filters: getProductsProps) {
    this.title.set(filters.title || '');
    this.categoryId.set(filters.categoryId || '');
    this.minPrice.set(filters.price_min || undefined);
    this.maxPrice.set(filters.price_max || undefined);
  }
}
