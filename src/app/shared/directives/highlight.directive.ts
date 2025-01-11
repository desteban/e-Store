import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective {
  element = inject(ElementRef);

  ngOnInit() {
    this.element.nativeElement.style.backgroundColor = 'red';
  }
}
