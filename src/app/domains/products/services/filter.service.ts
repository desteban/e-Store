import { computed, Injectable, signal } from '@angular/core';
import FiltersProducts from '@app/domains/products/models/FiltersProducts';

type FilterKeys = keyof FiltersProducts;

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  categoryId = signal<string>('');
  title = signal<string>('');
  filters = computed<FiltersProducts>(() => this.getFilters());
  activeFilters = computed<FilterKeys[]>(() => this.getActiveFilters());
  minPrice = signal<number | undefined>(undefined);
  maxPrice = signal<number | undefined>(undefined);

  private getFilters(): FiltersProducts {
    const filters: FiltersProducts = {};

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

    return filters;
  }

  private getActiveFilters(): FilterKeys[] {
    return Object.keys(this.filters()).filter(
      (key) => this.filters()[key as FilterKeys] !== undefined
    ) as FilterKeys[];
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

  syncFilters(filters: FiltersProducts) {
    this.title.set(filters.title || '');
    this.categoryId.set(filters.categoryId || '');
    this.minPrice.set(filters.price_min || undefined);
    this.maxPrice.set(filters.price_max || undefined);
  }
}
