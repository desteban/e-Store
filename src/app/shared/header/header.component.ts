import {
  Component,
  computed,
  Input,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../models/Product.model';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-header',
  imports: [ProductComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input({ required: true }) cart: Product[] = [];
  hideSideMenu = signal(true);
  total = signal('');

  ngOnChanges(changes: SimpleChanges) {
    const cart = changes['cart'];
    console.log(changes);

    if (cart) {
      this.total.set(this.calcTotal().toLocaleString());
    }
  }

  toggleSideMenu() {
    this.hideSideMenu.update((prev) => !prev);
  }

  calcTotal(): number {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }
}
