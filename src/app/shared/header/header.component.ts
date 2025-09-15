import { Component, inject, Signal, signal } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { CartService } from '../services/cart.service';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '../services/Auth.service';

@Component({
  selector: 'app-header',
  imports: [ProductComponent, RouterLinkActive, RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private cartService = inject(CartService);
  private autService: AuthService = inject(AuthService);
  userLoggedIn: boolean = this.autService.isUserLoggedIn();
  hideSideMenu = signal(true);
  cart = this.cartService.cart;
  totalPrice = this.cartService.totalPriceCart;
  sizeCart = this.cartService.sizeCart;
  removeProduct = this.cartService.deleteToCart;

  toggleSideMenu() {
    this.hideSideMenu.update((prev) => !prev);
  }
}
