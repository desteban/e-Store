import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { Router } from '@angular/router';
import { ScrollToService } from '@app/shared/services/scroll-to.service';
import { ViewHiddenComponent } from "@app/components/ui/view-hidden/view-hidden.component";

@Component({
  selector: 'products-filter-price',
  imports: [FormsModule, ViewHiddenComponent],
  templateUrl: './filter-price.component.html',
  styleUrl: './filter-price.component.css',
})
export class FilterPriceComponent {
  private productsFilterService = inject(FilterService);
  private scrollService = inject(ScrollToService);
  maxPrice = this.productsFilterService.maxPrice;
  minPrice = this.productsFilterService.minPrice;
  setMaxPrice = this.productsFilterService.changeMaxPrice;
  setMinPrice = this.productsFilterService.changeMinPrice;

  constructor(private router: Router) {}

  filterByPrice(event: Event) {
    event.preventDefault();
    this.router.navigate([''], {
      queryParamsHandling: 'merge',
      queryParams: this.productsFilterService.filters(),
    });
    this.scrollService.scrollToMain();
  }

  changeMaxPrice(event: Event) {
    this.setMaxPrice(this.getPrice(event));
  }

  changeMinPrice(event: Event) {
    this.setMinPrice(this.getPrice(event));
  }

  private getPrice(event: Event): number | undefined {
    event.preventDefault();
    const { value } = event.currentTarget as HTMLInputElement;
    return value.length !== 0 ? +value : undefined;
  }
}
