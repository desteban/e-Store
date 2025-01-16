import { computed, Injectable, signal } from '@angular/core';
import getProductsProps from '@app/shared/models/getProductsProps';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  categoryId = signal<string>('');
  title = signal<string>('');
  filters = computed<getProductsProps>(() => this.getFilters());

  getFilters(): getProductsProps {
    const filters: getProductsProps = {};

    if (this.title().length !== 0) {
      filters.title = this.title();
    }

    if (this.categoryId().length !== 0) {
      filters.categoryId = this.categoryId();
    }

    return filters;
  }

  changeTitle(event: Event) {
    event.preventDefault();
    const { value } = event.currentTarget as HTMLInputElement;
    this.title.set(value);
  }
}
