import { Component, computed, Input, signal } from '@angular/core';
import { Product } from '../models/Product.model';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input({ required: true }) cart: Product[] = [];
  hideSideMenu = signal(true);

  toggleSideMenu() {
    this.hideSideMenu.update((prev) => !prev);
  }
}
