import { computed, Injectable, signal } from '@angular/core';
import FiltersProducts from '@app/domains/products/models/FiltersProducts';

export type FilterKeys = keyof FiltersProducts;

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  title = signal<string>('');
  categoryId = signal<string>('');
  minPrice = signal<number | undefined>(undefined);
  maxPrice = signal<number | undefined>(undefined);
  private filter = computed<FiltersProducts>(() => this.getFilters());
  activeFilters = computed<FilterKeys[]>(() => this.getActiveFilters());

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
    return Object.keys(this.filter()).filter(
      (key) => this.filter()[key as FilterKeys] !== undefined
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

  get filters(): FiltersProducts {
    const minPrice: number | undefined = this.minPriceFilter;
    return { ...this.filter(), price_min: minPrice };
  }

  private get minPriceFilter() {
    const minPrice = this.minPrice();
    const maxPrice = this.maxPrice();

    if (minPrice === undefined && maxPrice === undefined) return undefined;

    if (minPrice === undefined && maxPrice !== undefined) return 1;

    return minPrice;
  }

  syncFilters(filters: FiltersProducts) {
    this.title.set(filters.title || '');
    this.categoryId.set(filters.categoryId || '');
    this.minPrice.set(filters.price_min || undefined);
    this.maxPrice.set(filters.price_max || undefined);
  }

  removeFilter(filter: FilterKeys) {
    switch (filter) {
      case 'title':
        this.title.set('');
        break;
      case 'categoryId':
        this.categoryId.set('');
        break;
      case 'price_min':
        this.minPrice.set(undefined);
        break;
      case 'price_max':
        this.maxPrice.set(undefined);
        break;
    }
  }
}
