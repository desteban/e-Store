import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'product-search',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private filtersProducts = inject(FilterService);
  title = this.filtersProducts.title;
  changeTitle = this.filtersProducts.changeTitle;
  filters = this.filtersProducts.filters;

  constructor(private router: Router) {}

  search(event: Event) {
    event.preventDefault();
    this.router.navigate(['/'], {
      queryParams: this.filters,
    });
  }
}
