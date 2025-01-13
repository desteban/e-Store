import { Component, inject, signal } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '@app/shared/models/Product.model';
import { CartService } from '@app/shared/services/cart.service';
import { ProductService } from '@app/shared/services/product.service';

@Component({
  selector: 'app-list',
  imports: [ProductComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  cartService = inject(CartService);
  products = signal<Product[]>([]);
  private productsServices = inject(ProductService);

  ngOnInit() {
    this.productsServices.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
      },
    });
  }

  addProduct(product: Product) {
    this.cartService.addToCart(product);
  }
}
