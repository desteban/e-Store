import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, computed, inject, Input, signal } from '@angular/core';
import { Product } from '@app/shared/models/Product.model';
import { ProductService } from '@app/shared/services/product.service';

@Component({
  selector: 'app-detail',
  imports: [CurrencyPipe, UpperCasePipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent {
  @Input() id?: string;
  private productService = inject(ProductService);
  product = signal<Product | null>(null);
  imageCover = signal<string | null>(null);

  ngOnInit() {
    if (this.id) {
      this.productService.getOne(this.id).subscribe({
        next: (data) => {
          this.product.set(data);
          this.imageCover.set(data.images[0] ?? null);
        },
      });
    }
  }

  changeImageCover(urlImage: string) {
    this.imageCover.set(urlImage);
  }
}
