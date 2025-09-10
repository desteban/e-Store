import { Component } from '@angular/core';
import { CreateNewProductComponent } from '../../containers/create-new-product/create-new-product.component';

@Component({
  selector: 'app-add-product',
  imports: [CreateNewProductComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export default class AddProductComponent {}
