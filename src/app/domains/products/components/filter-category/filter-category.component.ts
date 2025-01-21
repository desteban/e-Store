import { Component, inject, Input, signal } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { Category } from '@app/shared/models/Category';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'products-filter-category',
  imports: [RouterLinkWithHref],
  templateUrl: './filter-category.component.html',
  styleUrl: './filter-category.component.css',
})
export class FilterCategoryComponent {
  @Input({ required: true }) categories!: Category[];
  private filterProducts = inject(FilterService);
  filters = this.filterProducts.filters;
  categoryId = this.filterProducts.categoryId;
  route = signal('');

  constructor(private router: Router) {
    this.route.set(this.router.url);
  }

  selectCategory(categoryId: string | number) {
    this.categoryId.set(categoryId as string);
  }
}
