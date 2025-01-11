import { Component, computed, inject, signal } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [ProductComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private cartService = inject(CartService);
  hideSideMenu = signal(true);
  cart = this.cartService.cart;
  totalPrice = this.cartService.totalPriceCart;
  sizeCart = this.cartService.sizeCart;
  removeProduct = this.cartService.deleteToCart;

  toggleSideMenu() {
    this.hideSideMenu.update((prev) => !prev);
  }
}
