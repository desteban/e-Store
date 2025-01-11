import { Component, Input } from '@angular/core';
import { Product } from '@app/shared/models/Product.model';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input({ required: true }) Product!: Product;
}
