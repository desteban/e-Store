import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@app/shared/models/Product.model';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input({ required: true }) Product!: Product;
  @Input({ required: true }) index!: number;

  @Output() removeProduct = new EventEmitter<number>();

  removeProductToCart() {
    this.removeProduct.emit(this.index);
  }
}
