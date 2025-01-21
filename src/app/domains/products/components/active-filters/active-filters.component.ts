import { Component, computed, inject } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'products-active-filters',
  imports: [JsonPipe],
  templateUrl: './active-filters.component.html',
  styleUrl: './active-filters.component.css',
})
export class ActiveFiltersComponent {
  private filtersService = inject(FilterService);
  active = this.filtersService.activeFilters;


}
