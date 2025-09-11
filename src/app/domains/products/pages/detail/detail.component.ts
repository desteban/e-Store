import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Product } from '@app/shared/models/Product.model';
import { CartService } from '@app/shared/services/cart.service';
import { ProductService } from '@app/domains/products/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductComponent } from '../../components/product/product.component';

@Component({
  selector: 'app-detail',
  imports: [CurrencyPipe, UpperCasePipe, ProductComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export default class DetailComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  product = signal<Product | null>(null);
  imageCover = signal<string | null>(null);
  relatedProducts = signal<Product[]>([]);
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id: string = params['id'];
      this.getProduct(id);
    });
  }

  private getProduct(slug: string): void {
    this.productService.getOne(slug).subscribe({
      next: (data) => {
        this.product.set(data);
        this.imageCover.set(data.images[0] ?? null);
        this.getRelatedProducts(data.slug);
      },
    });
  }

  getRelatedProducts(slug: string) {
    this.productService.getRelatedProducts(slug).subscribe({
      next: (products) => {
        this.relatedProducts.set(products);
      },
    });
  }

  changeImageCover(urlImage: string) {
    this.imageCover.set(urlImage);
  }

  addToCart() {
    const currentProduct = this.product();
    if (currentProduct) {
      this.cartService.addToCart(currentProduct);
    }
  }
}
