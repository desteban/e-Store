import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@app/shared/models/Product.model';
import { ReversePipe } from '@app/shared/pipes/reverse.pipe';

@Component({
  selector: 'app-product',
  imports: [UpperCasePipe, CurrencyPipe, ReversePipe],
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
