import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Product {
  imgSrc: string;
  title: string;
  price: number;
}

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input({ required: true }) imgSrc: string = '';
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) price: number = 0;

  @Output() addToCart = new EventEmitter<Product>();

  addToCartHandler() {
    this.addToCart.emit({
      imgSrc: this.imgSrc,
      title: this.title,
      price: this.price,
    } as Product);
  }
}
