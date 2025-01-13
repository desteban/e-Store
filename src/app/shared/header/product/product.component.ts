import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Product } from '@app/shared/models/Product.model';
import { MaxLenghtTextPipe } from '@app/shared/pipes/max-lenght-text.pipe';

@Component({
  selector: 'app-product',
  imports: [MaxLenghtTextPipe, RouterLinkWithHref, CurrencyPipe],
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
