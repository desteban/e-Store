import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@app/shared/models/Product.model';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;

  @Output() addToCart = new EventEmitter<Product>();

  addToCartHandler() {
    this.addToCart.emit(this.product);
  }
}
