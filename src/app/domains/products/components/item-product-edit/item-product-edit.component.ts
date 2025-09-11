import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@app/shared/models/Product.model';
import { ViewHiddenComponent } from '@app/components/ui/view-hidden/view-hidden.component';
import { TrashIconComponent } from '@app/assets/trash-icon/trash-icon.component';
import { ProductDeletionPayload } from '../../models/ProducPayload';

@Component({
  selector: 'tr[product-item-product-edit]',
  imports: [ViewHiddenComponent, TrashIconComponent],
  templateUrl: './item-product-edit.component.html',
  styleUrl: './item-product-edit.component.css',
})
export class ItemProductEditComponent {
  @Input({ required: true }) product!: Product;
  @Input({ required: false }) index!: number;

  @Output() deleteProduct = new EventEmitter<ProductDeletionPayload>();

  onDelete() {
    this.deleteProduct.emit({
      index: this.index,
      product: this.product,
    });
  }

  get Price(): string {
    return this.product.price.toLocaleString();
  }
}
