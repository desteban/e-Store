import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollToService {
  scrollTo(querySelector: string) {
    this.scrollToBehavior(querySelector);
  }

  scrollToBehavior(
    querySelector: string,
    behavior: ScrollBehavior = 'instant'
  ) {
    const el = document.querySelector(querySelector);
    if (el) {
      el.scrollIntoView({ behavior });
    }
  }
}
