import { Component, computed, input, Input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'products-pagination',
  imports: [RouterLinkWithHref],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  // @Input({ required: true }) currentPage: number = 1;
  // nextPage: number = this.currentPage + 1;
  // prevPage: number = this.currentPage - 1;

  currentPage = input<number>(1);
  nextPage = computed<number>(() => this.currentPage() + 1);
  prevPage = computed<number>(() => {
    const prev = this.currentPage() - 1;
    if (prev > 0) {
      return prev;
    }

    return 1;
  });
}
