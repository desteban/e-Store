import { Component, computed, inject } from '@angular/core';
import { FilterKeys, FilterService } from '../../services/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'products-active-filters',
  imports: [],
  templateUrl: './active-filters.component.html',
  styleUrl: './active-filters.component.css',
})
export class ActiveFiltersComponent {
  private filtersService = inject(FilterService);
  active = this.filtersService.activeFilters;

  constructor(private router: Router) {}

  getTittleCategory(category: FilterKeys): string {
    const titles: { [key in FilterKeys]: string } = {
      title: 'Title',
      categoryId: 'Category',
      price_min: 'Min Price',
      price_max: 'Max Price',
    };

    return titles[category] || 'unknown';
  }

  getIconCategory(category: FilterKeys): string {
    const base = '/filters-icons/';
    const titles: { [key in FilterKeys]: string } = {
      title: 'title',
      categoryId: 'category',
      price_min: 'price',
      price_max: 'price',
    };

    return titles[category]
      ? `${base}${titles[category]}.svg`
      : `${base}category.svg`;
  }

  removeCategory(category: FilterKeys): void {
    this.filtersService.removeFilter(category);
    this.router.navigate([''], { queryParams: this.filtersService.filters });
  }
}
