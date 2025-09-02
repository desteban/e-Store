import { Component, computed, Input, input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'products-pagination',
  imports: [RouterLinkWithHref],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input({ required: false }) isNextPage: boolean = true;

  private hash: string = 'main';
  currentPage = input<number>(1);
  nextPage = computed<number>(() => this.currentPage() + 1);
  prevPage = computed<number>(() => {
    const prev = this.currentPage() - 1;
    if (prev > 0) {
      return prev;
    }

    return 1;
  });

  onClick() {
    const el = document.getElementById(this.hash);
    if (el) {
      el.scrollIntoView({ behavior: 'instant' });
    }
  }
}
