import { Component, signal } from '@angular/core';
import {
  Product,
  ProductComponent,
} from '../../components/product/product.component';

@Component({
  selector: 'app-list',
  imports: [ProductComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products = signal<Product[]>([
    this.addProductInitial('Product 1', 100),
    this.addProductInitial('Product 2', 200),
    this.addProductInitial('Product 3', 300),
    this.addProductInitial('Product 4', 500),
    this.addProductInitial('Product 5', 220),
    this.addProductInitial('Product 6', 300),
  ]);

  addProductInitial(title: string, price: number): Product {
    return {
      imgSrc: 'https://picsum.photos/300/300?r=' + Math.random(),
      title,
      price,
    };
  }

  addToCart(event: Product) {
    console.log('add product', event);
  }
}
